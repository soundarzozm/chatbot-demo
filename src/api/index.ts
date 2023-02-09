const URL: string = 'https://api.openai.com/v1/completions'
const API_KEY: string = import.meta.env.VITE_API_KEY

const postQuery = (query: String) => {
	const data = {
		model: 'text-davinci-003',
		prompt: query,
		temperature: 0.7,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	}

	return fetch(URL, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${API_KEY}`,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	})
}

export default postQuery
