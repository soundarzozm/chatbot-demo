import { useState } from 'react'
import Chatbot from './Chatbot'
import Wallpaper from './Wallpaper'

function App() {
	const [selectedBot, setSelectedBot] = useState('mui')

	return (
		<>
			<Wallpaper />
			<div className='flex justify-center pt-48'>
				<select
					onChange={(e) => {
						setSelectedBot(e.target.value)
					}}
					value={selectedBot}
					className='outline-none py-3 px-6 rounded-xl shadow-xl font-light text-lg tracking-wide backdrop-blur-xl bg-[#ffffff99]'
				>
					<option value='tw'>TailWind CSS</option>
					<option value='mui'>Material UI</option>
					<option value='css'>CSS</option>
				</select>
				<div>
					<Chatbot bot={selectedBot} />
				</div>
			</div>
		</>
	)
}

export default App
