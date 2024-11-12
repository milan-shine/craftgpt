import React, { useEffect } from "react";
import { CheckSquare, Copy } from "lucide-react";

export default function CopyButton({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    }

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);
  return (
    <div
      title="copy"
      className={`relative cursor-pointer ${disabled ? "" : "text-gray-400"}`}
      onClick={disabled ? copyText : () => {}}
    >
      {isCopied && (
        <span
          className="absolute rounded-md bg-black px-2 text-sm text-white"
          style={{ marginTop: "-2rem" }}
        >
          Copied
        </span>
      )}
      {isCopied ? <CheckSquare /> : <Copy />}
    </div>
  );
}
