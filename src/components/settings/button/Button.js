import './button.scss'

function Button({text, difficulty, difficultySettup, difficultyCurrent}) {
    let cssClasses = `button-setting ${difficulty}`
    difficultyCurrent === difficulty ? cssClasses += ' active' : cssClasses += ' inactive'
    function difficultySet(){
        difficultySettup(difficulty)
    }
	return (
		<button className={cssClasses} onClick={difficultySet}>{text}</button>
	);
}

export default Button;