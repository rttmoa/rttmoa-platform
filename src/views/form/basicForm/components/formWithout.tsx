/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Form, InputNumber } from 'antd'

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus']

const validatePrimeNumber = (number: number): { validateStatus: ValidateStatus; errorMsg: string | null } => {
	if (number === 11) {
		return {
			validateStatus: 'success',
			errorMsg: null,
		}
	}
	return {
		validateStatus: 'error',
		errorMsg: 'The prime between 8 and 12 is 11!',
	}
}

const formItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 },
}

const tips = 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.'

const App: React.FC = () => {
	const [number, setNumber] = useState<{
		value: number
		validateStatus?: ValidateStatus
		errorMsg?: string | null
	}>({ value: 11 })

	const onNumberChange = (value: any) => {
		setNumber({
			...validatePrimeNumber(value),
			value,
		})
	}

	return (
		<>
			{
				<>
					<Form style={{ maxWidth: 600 }}>
						<Form.Item
							{...formItemLayout}
							label="Prime between 8 & 12"
							validateStatus={number.validateStatus} // "" | "success" | "warning" | "error" | "validating" | undefined
							help={number.errorMsg || tips} // React.ReactNode
						>
							<InputNumber min={8} max={12} value={number.value} onChange={onNumberChange} />
						</Form.Item>
					</Form>
				</>
			}
		</>
	)
}

export default App
