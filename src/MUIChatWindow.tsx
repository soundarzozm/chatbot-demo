import CloseRounded from '@mui/icons-material/CloseRounded'
import SendIcon from '@mui/icons-material/Send'
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	TextField,
	InputAdornment,
} from '@mui/material'
import { MessageItem } from './types'

const MUIChatWindow = (props: {
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
			<Card
				sx={{
					width: '500px',
					height: '600px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					marginBottom: '10px',
					borderRadius: '20px',
					background: 'rgba(255, 255, 255, 0.6)',
					'@media (max-width: 640px)': {
						position: 'fixed',
						top: '0px',
						right: '0px',
						width: '100vw',
						height: '100vh',
						borderRadius: '0px',
						background: 'rgba(255, 255, 255, 1)',
					},
				}}
			>
				<CardHeader
					title={props.headerText}
					action={
						<IconButton
							aria-label='close'
							onClick={(e) => props.closeWindow(e)}
						>
							<CloseRounded />
						</IconButton>
					}
				/>
				<CardContent
					sx={{
						overflowY: 'scroll',
						flexDirection: 'column-reverse',
						display: 'flex',
						height: '100%',
						padding: '0px 20px',
					}}
				>
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
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<TextField
						autoFocus
						value={props.queryValue}
						onChange={(e) => props.handleQueryInput(e)}
						placeholder='Type your query here'
						size='small'
						fullWidth
						sx={{ '& fieldset': { border: 'none' } }}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								props.handleQuerySubmit(e)
							}
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={(e) =>
											props.handleQuerySubmit(e)
										}
									>
										<SendIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</CardActions>
			</Card>
		</>
	)
}

export default MUIChatWindow
