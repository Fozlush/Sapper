import { useState } from 'react';
import Field from './components/field/Field';
import Settings from './components/settings/Settings';
import './style.scss'

function App() {
	const [difficulty, setDifficulty] = useState('normal')
    function difficultySettup(newDifficulty){
        setDifficulty(newDifficulty)
    }
	return (
		<div className="App">
			<Settings difficultySettup={difficultySettup} difficultyCurrent={difficulty}/>
			<Field difficulty={difficulty}/>
		</div>
	);
}

export default App;