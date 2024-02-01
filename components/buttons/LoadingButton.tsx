import { Button } from "../shadcn/ui/button"
import { Loader } from "lucide-react"

interface LoadingBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading: boolean
} 

export default function LoadingButton ({isLoading, children, ...props}: LoadingBtnProps){
    return(
        <Button {...props} className="flex gap-2">
            {isLoading && <Loader className="animate-spin"/>}
            {children}
        </Button>
    )
}