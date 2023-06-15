import './App.css';
import { useState, useEffect } from 'react';
import img1 from './img/einstein.png';

console.log();

function App() {
	const [headActive, setHeadActive] = useState(false);
	const [error, setError] = useState('');
	const [answer, setAnswer] = useState('');
	const [input, setInput] = useState('');
	const [apiKey, setApiKey] = useState('');

	const shakeHead = () => {
		setHeadActive(true);
		setTimeout(intupCheck, 1000);
	};

	const inputHandler = (event) => setInput(event.target.value);
	const keyHandler = (event) => setApiKey(event.target.value);

	const giveAnswer = async () => {
		const options = {
			method: 'POST',
			headers: {
				// Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: input }],
				max_tokens: 100,
			}),
		};

		try {
			const res = await fetch(
				'https://api.openai.com/v1/chat/completions',
				options
			);
			const data = await res.json();
			setAnswer(data.choices[0].message.content);
		} catch (err) {
			setError(err);
		}
	};

	const intupCheck = () => {
		if (input !== '' && input.slice(-1) === '?') {
			giveAnswer();
			setError('');
		} else if (input !== '' && input.slice(-1) !== '?') {
			setError('Please use the question mark "?"');
			setAnswer('');
		} else {
			setError('Please type the question.');
			setAnswer('');
		}
		setHeadActive(false);
	};

	useEffect(() => {
		console.log(apiKey);
	}, [apiKey]);

	return (
		<div className='wrapper'>
			<div className='info'>
				<h1>Ask Einstein</h1>
				<p>Ask a question, click Einstein and find the answer!</p>
				<input
					onChange={keyHandler}
					type='text'
					placeholder='enter API KEY and hit Enter'
				/>
			</div>

			<div className='head-img'>
				<img
					className={headActive ? 'shake-animation' : ''}
					src={img1}
					onClick={shakeHead}
					alt='Albert Einstein'
				/>
			</div>

			<div className='question-area'>
				<input type='text' onChange={inputHandler} />
				<p className='answer'>{answer}</p>
				<p className='error'>{error}</p>
			</div>
		</div>
	);
}

export default App;

// EINSTEIN WITHOUT AI

// import './App.css';
// import { useState, useEffect } from 'react';

// function App() {
// 	const [headActive, setHeadActive] = useState(false);
// 	const [error, setError] = useState('');
// 	const [answer, setAnswer] = useState('');
// 	const [input, setInput] = useState('');
// 	const [number, setNumber] = useState(null);

// 	const [aswerList] = useState([
// 		'Yes!',
// 		'No.',
// 		'Maybe...',
// 		'It is hard to say.',
// 		'Do you really want to know answer to this question?',
// 		'It will be better for You if You do not know the answer...',
// 	])

// 	const shakeHead = () => {
// 		setHeadActive(true);
// 		setTimeout(intupCheck, 1000);
// 	};
// 	const inputHandler = (event) => {
// 		setInput(event.target.value);
// 	};

// 	const generate = () => {
// 		setNumber(Math.floor(Math.random() * aswerList.length));
// 		console.log('generate', number, answer);
// 	};

// 	const giveAnswer = () => {
// 		generate();
// 		// setAnswer(aswerList[number]);
// 		console.log('give answer after', number, answer);
// 	};

// 	const intupCheck = () => {
// 		if (input !== '' && input.slice(-1) === '?') {
// 			giveAnswer();
// 			setError('');
// 		} else if (input !== '' && input.slice(-1) !== '?') {
// 			setError('Please use the question mark "?"');
// 			setAnswer('');
// 		} else {
// 			setError('Please type the question.');
// 			setAnswer('');
// 		}
// 		setHeadActive(false);
// 	};

// 	useEffect(() => {
// 		setAnswer(aswerList[number]);
// 	}, [number, aswerList]);

// 	return (
// 		<div className='wrapper'>
// 			<div className='info'>
// 				<h1>Ask Einstein</h1>
// 				<p>Ask a question, click Einstein and find the answer!</p>
// 			</div>

// 			<div
// 				className={`head-img ${headActive ? 'shake-animation' : ''}`}
// 				onClick={shakeHead}>
// 				<img src='./img/einstein.webp' alt='Albert Einstein' />
// 			</div>

// 			<div className='question-area'>
// 				<h2>Ask a question:</h2>
// 				<input type='text' onChange={inputHandler} />
// 				<p className='answer'>{answer}</p>
// 				<p className='error'>{error}</p>
// 			</div>
// 		</div>
// 	);
// }

// export default App;
