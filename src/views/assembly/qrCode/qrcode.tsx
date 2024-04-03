import { useState, useEffect, useCallback } from 'react'
import { Input, Button, Space } from 'antd'
import QRCode from 'qrcode'

const generateQR = (urlContent: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		QRCode.toDataURL(
			urlContent,
			{
				width: 800,
				margin: 5,
				color: {},
			},
			(err: any, urls: string) => {
				if (err) {
					reject(err)
				} else {
					resolve(urls)
				}
			}
		)
	})
}

const QrCode = () => {
	const [url, setUrl] = useState('')
	const [qr, setQr] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const delay = (ms: number) => new Promise(reslove => setTimeout(reslove, ms))

	const generateQRCode = useCallback(async (urlContent: string) => {
		setLoading(true)
		await delay(500)
		try {
			const qrCodeUrl = await generateQR(urlContent)
			setQr(qrCodeUrl)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		generateQRCode('https://google.com')
	}, [generateQRCode])

	const handleGenerateQRCode = () => {
		generateQRCode(url)
	}

	const handleRandomGenerateQRCode = () => {
		generateQRCode(Math.random().toString().substring(3) + '点击随机生成文本信息')
	}

	return (
		<div className="w-full min-h-96 bg-white p-6 overflow-hidden">
			<h2 className="mb-3 text-base">生成二维码</h2>
			<Space>
				<Input
					placeholder="生成指定内容的二维码"
					value={url}
					onChange={e => {
						setUrl(e.target.value)
					}}
				/>
				<Button onClick={handleGenerateQRCode} loading={loading}>
					Generate
				</Button>
				<Button onClick={handleRandomGenerateQRCode} loading={loading}>
					Random Generate
				</Button>
			</Space>
			<section>
				<Space>
					{loading ? <p>Generating QR Code...</p> : <img src={qr} alt="QRCode" width={250} />}
					<Button type="link" href={qr} download={`${+new Date()}.png`} disabled={!qr}>
						DownLoad
					</Button>
				</Space>
			</section>
		</div>
	)
}

export default QrCode
