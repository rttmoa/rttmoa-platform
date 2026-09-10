import { useRef, useState } from 'react';

interface ClipboardFunctions {
	copyToClipboard: (text: string) => void;
}
type IsCopiedState = boolean;
type TextareaRef = React.RefObject<HTMLTextAreaElement | null>;

type ClipboardHook = ClipboardFunctions & {
	result: null | Object;
	isCopied: IsCopiedState;
	textareaRef: TextareaRef;
};
type stateType = null | { state: 'success' } | { state: 'error'; message: string };

// * 常用功能： 剪切板
const useClipboard = (): ClipboardHook => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [result, setResult] = useState<stateType>(null);
	const [isCopied, setIsCopied] = useState<IsCopiedState>(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setResult({ state: 'success' });
			setIsCopied(true);
		} catch (err: any) {
			setResult({ state: 'error', message: err.message });
			console.error('复制操作不被支持或失败: ', err);
		} finally {
			// 👇 Show the result feedback for 2 seconds
			setTimeout(() => {
				setResult(null);
			}, 2000);
		}
	};

	return { copyToClipboard, isCopied, textareaRef, result };
};

export default useClipboard;

// export function Example() {
//   const [inputText, setInputText] = useState('');
//   const { copyToClipboard, isCopied, textareaRef, result } = useClipboard();

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
