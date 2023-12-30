import React, { useState } from "react";

type stateType = null | { state: "success" } | { state: "error"; message: string };

export default function useCopyToClipboard() {
  const [result, setResult] = useState<stateType>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setResult({ state: "success" });
    } catch (Error: any) {
      setResult({ state: "error", message: Error.message });
      throw Error;
    } finally {
      // 👇 Show the result feedback for 2 seconds
      setTimeout(() => {
        setResult(null);
      }, 2000);
    }
  };
  return [copy, result] as const;
}

// export function Example() {
//   const [inputText, setInputText] = useState('');
//   const [copyToClipboard, copyResult] = useCopyToClipboard();

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(e.target.value);
//   };

//   const handleClickCopy = () => {
//     copyToClipboard(inputText);
//   };

//   return (
//     <div>
//       <input value={inputText} onChange={handleChangeInput} />
//       <button onClick={handleClickCopy}>Copy to clipboard</button>
//       <div>
//         {copyResult?.state === 'success' && 'Copied successfully!'}
//         {copyResult?.state === 'error' && `Error: ${copyResult.message}`}
//       </div>
//     </div>
//   );
// }

// import toast from 'react-hot-toast';

// type Props = React.HTMLAttributes<HTMLButtonElement> & {
//   text: string;
// };

// function CopyToClipboard({ text, children = 'Copy', ...rest }: Props) {
//   const handleClickCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(text);
//       // 👇 Using react-hot-toast to provide feedback
//       toast.success('Copied!');
//     } catch (e) {
//       toast.error(`Error: ${e.message}`);
//       throw e;
//     }
//   };

//   return (
//     <button onClick={handleClickCopy} {...rest}>
//       {children}
//     </button>
//   );
// }

// export function Example() {
//   const [inputText, setInputText] = React.useState('');

//   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(e.target.value);
//   };

//   return (
//     <div>
//       {/* 👇 Don't forget to add this */}
//       <Toaster />
//       <input value={inputText} onChange={handleChangeInput} />
//       <CopyToClipboard text={inputText} />
//     </div>
//   );
// }
