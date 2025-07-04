import React from 'react';

export default function UserInfo() {
	return (
		<>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1 '>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
							/>
						</svg>
					</span>
					<span>用户名称</span>
				</span>
				<span>admin</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
							/>
						</svg>
					</span>
					<span>手机号码</span>
				</span>
				<span>188888888888</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
							/>
						</svg>
					</span>
					<span>用户邮箱</span>
				</span>
				<span>rttmoa@gmail.com</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z'
							/>
						</svg>
					</span>
					<span>所属部门</span>
				</span>
				<span>开发部</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z'
							/>
						</svg>
					</span>
					<span>所属岗位</span>
				</span>
				<span>员工</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
							/>
						</svg>
					</span>
					<span>所属角色</span>
				</span>
				<span>超级管理员,普通角色</span>
			</div>
			<div className='mb-3 py-2 flex justify-between border-b'>
				<span className='flex items-center'>
					<span className='mr-1'>
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3' />
						</svg>
					</span>
					<span>创建日期</span>
				</span>
				<span>2023-11-1</span>
			</div>
		</>
	);
}
