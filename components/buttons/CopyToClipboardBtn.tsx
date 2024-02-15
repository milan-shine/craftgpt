import React, { useEffect } from 'react'
import { CheckSquare, Copy } from 'lucide-react'

export default function CopyButton({text}: {text: string}){
    const [isCopied, setIsCopied] = React.useState(false)

    const copyText = () => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
    }

    useEffect(()=> {
        setTimeout(() => {
            setIsCopied(false)
        },1500)
    }, [isCopied])
    return(
        <div title="copy" className='cursor-pointer relative' onClick={copyText}>
            {isCopied && <span className='absolute bg-black rounded-md text-sm text-white px-2' style={{marginTop: '-2rem'}}>Copied</span> }
            {
                isCopied
                ? <CheckSquare/>
                : <Copy/>
            }
        </div>
    )
}