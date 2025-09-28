from math import sqrt

LAYERS = 6
HEADS = 5
MLP_SCALE = 4
EMBED_SIZE = 240
HEAD_SIZE = EMBED_SIZE // HEADS
VOCAB_SIZE = 1920
OUTPUT_SIZE = 8

FIXED_POINT_SIZE = 24
FIXED_POINT_MASK = (1 << FIXED_POINT_SIZE) - 1
MATMUL_FIXED_POINT = 18
MATMUL_EXTRA_PRECISION = 4
MATMUL_BIG_MASK = (1 << (FIXED_POINT_SIZE + MATMUL_EXTRA_PRECISION)) - 1

LAYERNORM_CONST = int((1 << 32) / EMBED_SIZE)
LAYERNORM_CONST_2 = int((1 << 27) / sqrt(EMBED_SIZE))  # 8663717
ATT_CONST = int((1 << 26) / sqrt(EMBED_SIZE))  # 4331858

EPS = int(1e-5 * EMBED_SIZE * (1 << (2 * MATMUL_FIXED_POINT)))


# debugging utils
def print_weights(weights, name="weights/expect_output.txt"):
    with open(name, "w") as f:
        for i in range(len(weights)):
            f.write(str(bin(weights[i]))[2:].zfill(24) + "\n")
    if name == "weights/expect_output.txt":
        with open("weights/output.txt") as f:
            i = 0
            for line in f.readlines():
                if i > len(weights) or line.strip() != str(bin(weights[i]))[2:].zfill(24):
                    print(f"diff on line {i}")
                    return
                i += 1
        print("ok")

def print_precision(weight, precision=24):
    print(str(bin(weight))[2:].zfill(precision))

def set_input(weights):
    with open("weights/weight_files/input.bin", "wb") as f:
        for i in range(len(weights)):
            f.write(weights[i].to_bytes(3, byteorder="little"))
    print_weights(weights, "weights/input.txt")



class MatMul:
    def __init__(self, weights, input_size, output_size, relu=False):
        self.weights = []
        for row in weights:
            self.weights.append([])
            for w in row:
                neg = (w >= 128)
                w %= 128
                if w < 64:
                    self.weights[-1].append((neg, 8, w // 8, w % 8))
                elif w < 96:
                    w -= 64
                    self.weights[-1].append((neg, 7, 4 + (w // 8), w % 8))
                elif w < 112:
                    w -= 96
                    self.weights[-1].append((neg, 5, 2 + (w // 8), w % 8))
                elif w < 120:
                    w -= 112
                    self.weights[-1].append((neg, 3, 1 + (w // 8), w % 8))
                else:
                    w -= 120
                    self.weights[-1].append((neg, 2, 1 + (w // 8), w % 8))
        self.input_size = input_size
        self.output_size = output_size
        self.relu = relu
    
    def forward(self, input):
        output = []
        normed = input[:]
        for j in range(self.input_size):
            normed[j] &= FIXED_POINT_MASK
            if normed[j] > FIXED_POINT_MASK // 2:
                normed[j] += ((1 << MATMUL_EXTRA_PRECISION) - 1) << FIXED_POINT_SIZE
        for i in range(self.output_size):
            cur = 0
            for j in range(self.input_size):
                w = self.weights[i][j]
                big = (normed[j] * w[2]) & MATMUL_BIG_MASK
                if big > (MATMUL_BIG_MASK // 2):
                    big += 255 << (MATMUL_EXTRA_PRECISION + FIXED_POINT_SIZE)
                small = (normed[j] * w[3]) & MATMUL_BIG_MASK
                if small > (MATMUL_BIG_MASK // 2):
                    small += 255 << (MATMUL_EXTRA_PRECISION + FIXED_POINT_SIZE)
                cont = (big >> w[1]) + (small >> (w[1] + 3))
                cont &= FIXED_POINT_MASK
                if w[0]:
                    cont = (-cont) & FIXED_POINT_MASK
                cur += cont
                cur &= FIXED_POINT_MASK
            if self.relu and cur > (FIXED_POINT_MASK // 2):
                output.append(0)
            else:
                output.append(cur)
        return output
    

class LayerNorm:
    def __init__(self, index):
        self.weights = []
        with open(f"weights/weight_files/layernorm/ln_{index}.bin", "rb") as f:
            for i in range(240):
                cur = int.from_bytes(f.read(3), byteorder="little")
                cur = cur // 2
                self.weights.append(cur)

    def forward(self, input):
        mean = 0
        for v in input:
            mean += v + ((255 << FIXED_POINT_SIZE) if v > (FIXED_POINT_MASK // 2) else 0)
        mean = mean & ((1 << 32) - 1)
        neg = (mean >= (1 << FIXED_POINT_SIZE + 7))
        if neg:
            mean = (-mean) & ((1 << (FIXED_POINT_SIZE + 7)) - 1)
        mean = ((mean * LAYERNORM_CONST) >> 32)
        if neg:
            mean = (-mean) & FIXED_POINT_MASK
        sigma2 = EPS
        for v in input:
            diff = v - mean
            if diff < 0:
                diff += (1 << FIXED_POINT_SIZE)
            diff %= (1 << FIXED_POINT_SIZE)
            if diff > (FIXED_POINT_MASK // 2):
                diff = (-diff) & (FIXED_POINT_MASK // 2)
            sigma2 += diff * diff
            sigma2 &= ((1 << 48) - 1)
        sigma2 = int(sqrt(sigma2))
        sigma2 = ((LAYERNORM_CONST_2 * sigma2) >> 27) & FIXED_POINT_MASK
        sigma2 = ((1 << (2 * MATMUL_FIXED_POINT)) // sigma2) & FIXED_POINT_MASK
        result = []
        for i, v in enumerate(input):
            diff = v - mean
            if diff < 0:
                diff += (1 << FIXED_POINT_SIZE)
            diff %= (1 << FIXED_POINT_SIZE)
            neg = (diff >= (FIXED_POINT_MASK // 2))
            if neg:
                diff = (-diff) & (FIXED_POINT_MASK // 2)
            res = ((diff * sigma2) >> MATMUL_FIXED_POINT) & (FIXED_POINT_MASK // 2)
            res = ((res * self.weights[i]) >> (MATMUL_FIXED_POINT + 3)) & (FIXED_POINT_MASK // 2)
            if neg:
                res = (-res) & FIXED_POINT_MASK
            result.append(res)
        return result



class MLP:
    def __init__(self, block_num):
        weights_up = [[] for i in range(MLP_SCALE * EMBED_SIZE)]
        weights_down = [[] for i in range(EMBED_SIZE)]
        for i in range(24):
            cur_weights = []
            with open(f"weights/weight_files/mlp/mlp_{25 + 48 * block_num + i}.bin", "rb") as f:
                for j in range(9600):
                    cur_weights.append(int.from_bytes(f.read(1), byteorder="little"))
            for j in range(5):
                if i % 2 == 0:
                    weights_down[48 * j + 2 * i] = cur_weights[(MLP_SCALE * EMBED_SIZE) * j:(MLP_SCALE * EMBED_SIZE) * (j + 1)]
                    weights_down[48 * j + 2 * i + 1] = cur_weights[(MLP_SCALE * EMBED_SIZE) * (j + 5):(MLP_SCALE * EMBED_SIZE) * (j + 6)]
                else:
                    weights_down[48 * j + 2 * i + 1] = cur_weights[(MLP_SCALE * EMBED_SIZE) * j:(MLP_SCALE * EMBED_SIZE) * (j + 1)]
                    weights_down[48 * j + 2 * i] = cur_weights[(MLP_SCALE * EMBED_SIZE) * (j + 5):(MLP_SCALE * EMBED_SIZE) * (j + 6)]
        for i in range(24):
            cur_weights = []
            with open(f"weights/weight_files/mlp/mlp_{1 + 48 * block_num + i}.bin", "rb") as f:
                for j in range(9600):
                    cur_weights.append(int.from_bytes(f.read(1), byteorder="little"))
            for j in range(20):
                if i % 2 == 0:
                    weights_up[48 * j + 2 * i] = cur_weights[EMBED_SIZE * j:EMBED_SIZE * (j + 1)]
                    weights_up[48 * j + 2 * i + 1] = cur_weights[EMBED_SIZE * (j + 20):EMBED_SIZE * (j + 21)]
                else:
                    weights_up[48 * j + 2 * i + 1] = cur_weights[EMBED_SIZE * j:EMBED_SIZE * (j + 1)]
                    weights_up[48 * j + 2 * i] = cur_weights[EMBED_SIZE * (j + 20):EMBED_SIZE * (j + 21)]

        self.matmul_up = MatMul(weights_up, EMBED_SIZE, EMBED_SIZE * MLP_SCALE, True)
        self.matmul_down = MatMul(weights_down, EMBED_SIZE * MLP_SCALE, EMBED_SIZE)
    
    def forward(self, input):
        res = self.matmul_up.forward(input)
        res = self.matmul_down.forward(res)
        return res



class Attention:
    def __init__(self, block_num):
        self.block_num = block_num
        key = [[[] for i in range(HEAD_SIZE)] for j in range(HEADS)]
        value = [[[] for i in range(HEAD_SIZE)] for j in range(HEADS)]
        query = [[[] for i in range(HEAD_SIZE)] for j in range(HEADS)]
        proj = [[] for i in range(EMBED_SIZE)]
        for i in range(24):
            cur_weights = []
            with open(f"weights/weight_files/attention/att_{1 + 24 * block_num + i}.bin", "rb") as f:
                for j in range(9600):
                    cur_weights.append(int.from_bytes(f.read(1), byteorder="little"))
            for j in range(HEADS):
                if i % 2 == 0:
                    key[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j):EMBED_SIZE * (3 * j + 1)]
                    value[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j + 1):EMBED_SIZE * (3 * j + 2)]
                    query[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j + 2):EMBED_SIZE * (3 * j + 3)]
                    key[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j + 20):EMBED_SIZE * (3 * j + 21)]
                    value[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j + 21):EMBED_SIZE * (3 * j + 22)]
                    query[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j + 22):EMBED_SIZE * (3 * j + 23)]
                else:
                    key[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j):EMBED_SIZE * (3 * j + 1)]
                    value[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j + 1):EMBED_SIZE * (3 * j + 2)]
                    query[j][2 * i + 1] = cur_weights[EMBED_SIZE * (3 * j + 2):EMBED_SIZE * (3 * j + 3)]
                    key[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j + 20):EMBED_SIZE * (3 * j + 21)]
                    value[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j + 21):EMBED_SIZE * (3 * j + 22)]
                    query[j][2 * i] = cur_weights[EMBED_SIZE * (3 * j + 22):EMBED_SIZE * (3 * j + 23)]
            for j in range(HEADS):
                if i % 2 == 0:
                    proj[(HEAD_SIZE) * j + 2 * i] = cur_weights[EMBED_SIZE * (j + 15):EMBED_SIZE * (j + 16)]
                    proj[(HEAD_SIZE) * j + 2 * i + 1] = cur_weights[EMBED_SIZE * (j + 35):EMBED_SIZE * (j + 36)]
                else:
                    proj[(HEAD_SIZE) * j + 2 * i + 1] = cur_weights[EMBED_SIZE * (j + 15):EMBED_SIZE * (j + 16)]
                    proj[(HEAD_SIZE) * j + 2 * i] = cur_weights[EMBED_SIZE * (j + 35):EMBED_SIZE * (j + 36)]

        self.matmul_key = [MatMul(key[i], EMBED_SIZE, HEAD_SIZE) for i in range(HEADS)]
        self.matmul_value = [MatMul(value[i], EMBED_SIZE, HEAD_SIZE) for i in range(HEADS)]
        self.matmul_query = [MatMul(query[i], EMBED_SIZE, HEAD_SIZE) for i in range(HEADS)]
        self.matmul_proj = MatMul(proj, EMBED_SIZE, EMBED_SIZE)

        self.softmax_exp = []
        with open(f"weights/weight_files/softmax.bin", "rb") as f:
            for j in range(1024):
                self.softmax_exp.append(int.from_bytes(f.read(3), byteorder="little"))

        self.k_cache = [[] for i in range(HEADS)]
        self.v_cache = [[] for i in range(HEADS)]
    
    def to_float16(self, value, offset=0):
        neg = False
        if value > FIXED_POINT_MASK // 2:
            neg = True
            value = (-value) & (FIXED_POINT_MASK // 2)
        for i in range(FIXED_POINT_SIZE - 1, -1, -1):
            if ((value >> i) & 1) > 0:
                res = ((value << (FIXED_POINT_SIZE - i)) >> (14)) & ((1 << 10) - 1)
                res += (i + 9 - offset) << 10
                res += int(neg) << 15
                return res
        return 0

    def float_mult(self, a, b, shift=0):
        neg = False
        offset = ((a >> 10) & 31) + ((b >> 10) & 31)
        if a >= (1 << 15):
            neg = (not neg)
            a -= (1 << 15)
        if b >= (1 << 15):
            neg = (not neg)
            b -= (1 << 15)
        if a > 0:
            a = (a & ((1 << 10) - 1)) + (1 << 10)
        if b > 0:
            b = (b & ((1 << 10) - 1)) + (1 << 10)
        res = ((a * b) << offset) >> (56 + shift)
        res = res & FIXED_POINT_MASK
        if neg:
            res = (-res) & FIXED_POINT_MASK
        return res

    def undo_last(self):
        for i in range(HEADS):
            self.k_cache[i].pop()
            self.v_cache[i].pop()
    
    def forward(self, input, token=0):
        res = []
        proj_input = []
        for head in range(HEADS):
            keys = self.matmul_key[head].forward(input)
            keys = list(map(self.to_float16, keys))
            self.k_cache[head].append(keys)
            values = self.matmul_value[head].forward(input)
            values = list(map(self.to_float16, values))
            self.v_cache[head].append(values)

            queries = self.matmul_query[head].forward(input)
            queries = list(map(self.to_float16, queries))
            relevance = [0] * len(self.k_cache[head])
            for i, v in enumerate(self.k_cache[head]):
                for j, q in enumerate(queries):
                    relevance[i] += self.float_mult(v[j], q, 5)
                    relevance[i] &= FIXED_POINT_MASK
            biggest = 0
            for i in range(len(relevance)):
                neg = False
                if relevance[i] > (FIXED_POINT_MASK // 2):
                    neg = True
                    relevance[i] = (-relevance[i]) & (FIXED_POINT_MASK // 2)
                relevance[i] = ((relevance[i] * ATT_CONST) >> 23) & (FIXED_POINT_MASK // 2)
                if neg:
                    relevance[i] = (-relevance[i]) & FIXED_POINT_MASK
                relevance[i] ^= (1 << (FIXED_POINT_SIZE - 1))
                biggest = max(biggest, relevance[i])
            
            output = [0] * HEAD_SIZE
            softmax_sum = 0
            for i in range(len(relevance)):
                power = (biggest - relevance[i]) >> 10
                if power >= 1024:
                    res = 0
                else:
                    res = self.softmax_exp[power]
                softmax_sum += res
            softmax_sum &= FIXED_POINT_MASK
            softmax_sum = (1 << 39) // softmax_sum
            for i in range(len(relevance)):
                power = (biggest - relevance[i]) >> 10
                if power >= 1024:
                    res = 0
                else:
                    res = self.softmax_exp[power]
                res = ((softmax_sum * res) >> 17) & (FIXED_POINT_MASK // 2)
                res = self.to_float16(res, offset=4)
                for j, v in enumerate(self.v_cache[head][i]):
                    output[j] += self.float_mult(res, v)
                    output[j] &= FIXED_POINT_MASK
            proj_input += output
        
        return self.matmul_proj.forward(proj_input)



class Block:
    def __init__(self, block_num):
        self.ln_1 = LayerNorm(2 * block_num + 1)
        self.att = Attention(block_num)
        self.ln_2 = LayerNorm(2 * block_num + 2)
        self.mlp = MLP(block_num)

    def forward(self, input):
        att_diff = self.att.forward(self.ln_1.forward(input))
        for i in range(240):
            input[i] = (input[i] + att_diff[i]) & FIXED_POINT_MASK
        mlp_diff = self.mlp.forward(self.ln_2.forward(input))
        for i in range(240):
            input[i] = (input[i] + mlp_diff[i]) & FIXED_POINT_MASK
        return input



class Embedding:
    def __init__(self):
        self.wte = []
        for i in range(60):
            with open(f"weights/weight_files/embedding/wte_{i + 1}.bin", "rb") as f:
                for j in range(32):
                    self.wte.append([])
                    for k in range(240):
                        cur = int.from_bytes(f.read(3), byteorder="little")
                        if cur >= (1 << 17):
                            cur |= (1 << 18) * ((1 << 6) - 1)
                        self.wte[-1].append(cur)
        self.wpe = []
        for i in range(2):
            with open(f"weights/weight_files/embedding/wpe_{i + 1}.bin", "rb") as f:
                for j in range(32):
                    self.wpe.append([])
                    for k in range(240):
                        cur = int.from_bytes(f.read(3), byteorder="little")
                        if cur >= (1 << 17):
                            cur |= (1 << 18) * ((1 << 6) - 1)
                        self.wpe[-1].append(cur)
    
    def get_weights(self, token, pos=-1):
        weights = self.wte[token].copy()
        if pos != -1:
            assert(0 <= pos < 64)
            for i in range(240):
                weights[i] += self.wpe[pos][i]
                weights[i] &= FIXED_POINT_MASK
        return weights



class Unembedding:
    def __init__(self):
        weights = [[] for i in range(VOCAB_SIZE)]
        for i in range(48):
            cur_weights = []
            with open(f"weights/weight_files/unembedding/lm_head_{i + 1}.bin", "rb") as f:
                for j in range(9600):
                    cur_weights.append(int.from_bytes(f.read(1), byteorder="little"))
            for j in range(20):
                if i % 2 == 0:
                    weights[48 * j + 2 * (i % 24) + 960 * (i // 24)] = cur_weights[EMBED_SIZE * j:EMBED_SIZE * (j + 1)]
                    weights[48 * j + 2 * (i % 24) + 960 * (i // 24) + 1] = cur_weights[EMBED_SIZE * (j + 20):EMBED_SIZE * (j + 21)]
                else:
                    weights[48 * j + 2 * (i % 24) + 960 * (i // 24) + 1] = cur_weights[EMBED_SIZE * j:EMBED_SIZE * (j + 1)]
                    weights[48 * j + 2 * (i % 24) + 960 * (i // 24)] = cur_weights[EMBED_SIZE * (j + 20):EMBED_SIZE * (j + 21)]
        self.lm_head = MatMul(weights, EMBED_SIZE, VOCAB_SIZE)

        self.softmax_exp = []
        with open(f"weights/weight_files/softmax_2.bin", "rb") as f:
            for j in range(1024):
                self.softmax_exp.append(int.from_bytes(f.read(3), byteorder="little"))
    
    def forward(self, input):
        logits = self.lm_head.forward(input)
        biggest = 0
        for i in range(VOCAB_SIZE):
            logits[i] = logits[i] ^ (1 << (FIXED_POINT_SIZE - 1))
            biggest = max(biggest, logits[i])
        softmax_sum = 0
        for i in range(VOCAB_SIZE):
            power = (biggest - logits[i]) >> 12
            if power >= 1024:
                res = 0
            else:
                res = self.softmax_exp[power]
            softmax_sum += res
        softmax_sum &= ((1 << 32) - 1)
        softmax_sum = (1 << 46) // softmax_sum
        output = [0] * OUTPUT_SIZE
        for i in range(VOCAB_SIZE):
            power = (biggest - logits[i]) >> 12
            if power >= 1024:
                res = 0
            else:
                res = self.softmax_exp[power]
            res = ((softmax_sum * res) >> 23) & FIXED_POINT_MASK
            res = (1 << 11) * res + i
            for j in range(OUTPUT_SIZE):
                if res > output[j]:
                    res, output[j] = output[j], res
        return output
        


class PRNG:
    def __init__(self, seed):
        self.seed = seed

    def next(self):
        for i in range(256):
            next_bit = ((self.seed >> 22) & 1) ^ ((self.seed >> 17) & 1)
            self.seed <<= 1
            self.seed &= ((1 << 23) - 1)
            self.seed += next_bit
        
        return self.seed



class Model:
    def __init__(self):
        self.tokens = Embedding()
        self.transformer = [Block(i) for i in range(6)]
        self.ln_f = LayerNorm(13)
        self.unembedding = Unembedding()
        print("Model loaded.")
        self.index = 0
    
    def process(self, token):
        value = self.tokens.get_weights(token, self.index)
        for block in self.transformer:
            value = block.forward(value)
        
        set_input(value)
        value = self.ln_f.forward(value)
        ans = self.unembedding.forward(value)
        self.index += 1
        return ans

    def undo_last(self):
        self.index -= 1
        for block in self.transformer:
            block.att.undo_last()



def get_prompt(tokens):
    prompt = " " + input("Enter prompt: ").lower()
    ans = [0]
    while prompt:
        maxlength = 0
        best = -1
        for i, token in enumerate(tokens):
            if len(token) <= len(prompt) and token.replace("_", " ") == prompt[:len(token)] and len(token) > maxlength:
                maxlength = len(token)
                best = i
        if best == -1:
            print(f"Could not parse prompt: '{prompt}")
            exit(1)
        ans.append(best)
        prompt = prompt[maxlength:]
    return ans



def run_model():
    tokens = []
    with open("tokens.txt", "r") as f:
        for line in f.readlines():
            tokens.append(line.strip())
    conversation = []
    model = Model()
    seed = int(input("Enter RNG seed, or -1 to view next token probability distribution: "))
    rng = PRNG(seed)
    while True:
        prompt = get_prompt(tokens)
        conversation.extend(prompt + [1])
        for token in prompt:
            print(f"Processing token '{tokens[token]}'")
            assert(0 <= token < 1920)
            model.process(token)
        if seed == -1:
            nxt = 1
            while True:
                print(f"Processing token '{tokens[nxt]}'")
                ans = model.process(nxt)
                for i in range(8):
                    token = ans[i] & 2047
                    prob = ans[i] >> 11
                    print(f"{i + 1}: {str(token).rjust(4)}, probability {str(round(prob / (1 << 23) * 100000) / 100000).ljust(7, '0')}, {tokens[token]}")
                nxt = int(input("Enter next token ID: "))
                if nxt == 0 or nxt == 1:
                    break
                conversation.append(nxt)
        else:
            nxt = 1
            while True:
                print(f"Processing token '{tokens[nxt]}'")
                act = model.process(nxt)
                cur = rng.next()
                here = -1
                for j in range(7, 0, -1):
                    if (act[j] >> 11) < (1 << 20):
                        continue
                    cur -= (act[j] >> 11)
                    if cur < 0:
                        here = act[j] & 2047
                        break
                if here == -1:
                    here = act[0] & 2047
                if here == 0 or here == 1:
                    break
                conversation.append(here)
                nxt = here
        print("".join(list(map(lambda f: tokens[f], conversation))).replace("_", " "))



if __name__ == "__main__":
    run_model()