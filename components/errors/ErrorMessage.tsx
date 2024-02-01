import { Label } from "../shadcn/ui/label";

export default function ErrorMessage({error}: {error: string}){
    return(
        <Label className="text-red-500">{error}</Label>
    )
}