import React, { useRef, useEffect, useState } from 'react'
import loadingGIF from '@/assets/images/loadiing.gif'

interface Params {
	src: string
	alt: string
}

const UseLazyLoadImage: React.FC<Params> = ({ src, alt }) => {
	const [imageSrc, setImageSrc] = useState('')
	const imgRef = useRef<any>(null)

	useEffect(() => {
		setTimeout(() => {
			let observer: any = null
			if (imgRef.current) {
				observer = new IntersectionObserver(
					entries => {
						// 当图片进入可视区域时，设置图片地址进行加载
						if (entries[0].isIntersecting) {
							setImageSrc(src)
							observer.unobserve(imgRef.current)
						}
					},
					{
						rootMargin: '0px 0px 200px 0px', // 可视区域的边距设置为200px
					}
				)
				observer.observe(imgRef.current)
			}
			return () => {
				if (observer && observer.unobserve) {
					// observer.unobserve(imgRef.current);
				}
			}
		}, 3000)
	}, [src])

	return <img ref={imgRef} src={imageSrc ? imageSrc : loadingGIF} alt={alt} />
}

export default UseLazyLoadImage
