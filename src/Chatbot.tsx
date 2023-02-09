import { useState } from 'react'
import CSSChatWindow from './CSSChatWindow'
import MUIChatWindow from './MUIChatWindow'
import TWChatWindow from './TWChatWindow'
import postQuery from './api'
import { MessageItem } from './types'

const chatBotHeaderText = 'Ask me anything!'

export default function Chatbot(props: { bot: string }) {
	const [chatWindowOpen, setChatWindowOpen] = useState(false)
	const [queryValue, setQueryValue] = useState('')
	const [messages, setMessages] = useState<Array<MessageItem>>([])
	const [loading, setLoading] = useState(false)

	const handleChatWindowToggle = () => {
		setChatWindowOpen((chatWindowOpen) => !chatWindowOpen)
	}

	const handleClearChat = () => {
		setChatWindowOpen((chatWindowOpen) => !chatWindowOpen)
		setMessages([])
	}

	const botChoiceHandler = () => {
		switch (props.bot) {
			case 'tw':
				return (
					<TWChatWindow
						closeWindow={handleClearChat}
						handleQueryInput={handleQueryInput}
						handleQuerySubmit={handleQuerySubmit}
						queryValue={queryValue}
						messages={messages}
						loading={loading}
						headerText={chatBotHeaderText}
					/>
				)
			case 'mui':
				return (
					<MUIChatWindow
						closeWindow={handleClearChat}
						handleQueryInput={handleQueryInput}
						handleQuerySubmit={handleQuerySubmit}
						queryValue={queryValue}
						messages={messages}
						loading={loading}
						headerText={chatBotHeaderText}
					/>
				)
			case 'css':
				return (
					<CSSChatWindow
						closeWindow={handleClearChat}
						handleQueryInput={handleQueryInput}
						handleQuerySubmit={handleQuerySubmit}
						queryValue={queryValue}
						messages={messages}
						loading={loading}
						headerText={chatBotHeaderText}
					/>
				)
			default:
				return (
					<MUIChatWindow
						closeWindow={handleClearChat}
						handleQueryInput={handleQueryInput}
						handleQuerySubmit={handleQuerySubmit}
						queryValue={queryValue}
						messages={messages}
						loading={loading}
						headerText={chatBotHeaderText}
					/>
				)
		}
	}

	const handleQueryInput = (event: any) => {
		setQueryValue(event.target.value)
	}

	const handleQuerySubmit = () => {
		if (queryValue === '') {
			return
		}
		setMessages((messages) => [
			{ type: 'input', text: queryValue },
			...messages,
		])
		setQueryValue('')

		setLoading(true)

		postQuery(queryValue).then((res) => {
			res.json()
				.then((data) => {
					setMessages((messages) => [
						{ type: 'output', text: data.choices[0].text },
						...messages,
					])
				})
				.catch((error) => {
					setMessages((messages) => [
						{
							type: 'output',
							text: 'An error has occured, please try again.',
						},
						...messages,
					])
				})
				.finally(() => {
					setLoading(false)
				})
		})
	}

	return (
		<div className='bot'>
			{chatWindowOpen && botChoiceHandler()}

			<div
				className='bot__icon'
				onClick={handleChatWindowToggle}
			>
				<svg
					stroke='currentColor'
					fill='currentColor'
					strokeWidth='0'
					viewBox='0 0 1024 1024'
					version='1.1'
					height='2em'
					width='2em'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM300 328c0-33.1 26.9-60 60-60s60 26.9 60 60-26.9 60-60 60-60-26.9-60-60z m372 248c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-60c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v60z m-8-188c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60zM799 864H225c-13.8 0-25 14.3-25 32v56c0 4.4 2.8 8 6.2 8h611.5c3.4 0 6.2-3.6 6.2-8v-56c0.1-17.7-11.1-32-24.9-32z'></path>
				</svg>
			</div>
		</div>
	)
}
