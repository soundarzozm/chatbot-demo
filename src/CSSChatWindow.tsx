import { MessageItem } from './types'

const CSSChatWindow = (props: {
	loading: boolean
	messages: MessageItem[]
	queryValue: string
	handleQuerySubmit: Function
	closeWindow: Function
	handleQueryInput: Function
	headerText: string
}) => {
	return (
		<>
			<div className='chatWindow'>
				<div className='bot__header'>
					<h1>{props.headerText}</h1>
					<svg
						stroke='currentColor'
						fill='currentColor'
						strokeWidth='0'
						viewBox='0 0 1024 1024'
						height='1em'
						width='1em'
						xmlns='http://www.w3.org/2000/svg'
						className='mr-4 hover:cursor-pointer'
						onClick={(e) => props.closeWindow(e)}
					>
						<path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
					</svg>
				</div>
				<div className='chatWindow__messageWindow'>
					{props.loading && (
						<div className='messageContainer messageContainer__output'>
							<div className='message message__output'>
								<span className='typingBubbleDot'></span>
								<span className='typingBubbleDot'></span>
								<span className='typingBubbleDot'></span>
							</div>
						</div>
					)}
					{props.messages.map(
						(
							message: { text: string; type: string },
							idx: number
						) => {
							return message.type === 'input' ? (
								<div
									className='messageContainer messageContainer__input'
									key={idx}
								>
									<div className='message message__input'>
										{message.text}
									</div>
								</div>
							) : (
								<div
									className='messageContainer messageContainer__output'
									key={idx}
								>
									<div className='message message__output'>
										{message.text}
									</div>
								</div>
							)
						}
					)}
				</div>
				<div className='chatWindow__queryContainer'>
					<input
						className='chatWindow__queryInput'
						autoFocus
						value={props.queryValue}
						onChange={(e) => props.handleQueryInput(e)}
						placeholder='Type your query here'
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								props.handleQuerySubmit(e)
							}
						}}
					/>
					<button
						className='chatWindow__querySubmit'
						onClick={(e) => props.handleQuerySubmit(e)}
					>
						<svg
							stroke='currentColor'
							fill='currentColor'
							strokeWidth='0'
							viewBox='0 0 24 24'
							height='1.5em'
							width='1.5em'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z'></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	)
}

export default CSSChatWindow
