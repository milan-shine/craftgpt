# CraftGPT

A small language model built to run in Minecraft, trained on the [TinyChat dataset](https://huggingface.co/datasets/starhopp3r/TinyChat).

Before attempting to run CraftGPT, please be aware that you shouldn't have high expectations. The model is very prone to going off topic, producing responses that are not grammatically correct, or simply outputting garbage. The model also has a very small context window of only 64 tokens. The conversations in the showcase video show the model at its best, not necessarily at its average performance.

[MCHPRS](https://github.com/MCHPR/MCHPRS) is essential for running CraftGPT within a reasonable amount of time. It's built using vanilla redstone mechanics, and should work in vanilla, but it could take upwards of 10 years to generate a response without increasing the tick rate. So if you don't have that long to wait, follow the instructions to install MCHPRS first.

Even with MCHPRS it can still take hours to generate a response, so I also strongly recommend you try inputting your prompt on the emulator first (and potentially try some different RNG seeds).

## How to run it

You will need a machine with at least 32GB of RAM to even load the server, but ideally you'd want 64GB or more.

- Download MCHPRS, set the plot scale to 7 (this can be found at `./crates/core/src/plot/mod.rs`) and compile it.
- Download the MCHPRS world, unpack it at `./target/release`, and rename it to `world`.
- Log on to MCHPRS (version 1.20.4) and type `/rp c -io`. (The `-io` flags enable optimised compilation and prevent sending non-input/output block updates to the player. You can run it without these flags in order to see the redstone update, but it will be significantly slower.) It takes about 10 minutes to compile on my machine.
- Type `/rtps unlimited` and `/wsr 1`.
- The default RNG seed is `1`. If you want to enter a different one, enter it in binary at `230, 150, 1000` and push the button to confirm.
- Type in your prompt and hit the enter key. Wait a couple hours for the response to be generated; the progress bar shows progress on the current token, and the binary counter shows the number of tokens processed so far. Once it's done, you can enter another prompt.

There's no reset or backspace button. If you want to reset it, the quickest way is just to load a fresh copy of the world, although it can be manually reset by pushing the button behind the screen, the buttons at all the attention block token counters, and clearing the input buffers.