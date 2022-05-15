import Button from './button/Button';
import './settings.scss'

function Settings({difficultySettup, difficultyCurrent}){
	return (
		<div className="settings">
			<Button text={'новичок'} difficulty={'easy'} difficultySettup={difficultySettup} difficultyCurrent={difficultyCurrent}/>
            <Button text={'любитель'} difficulty={'normal'} difficultySettup={difficultySettup} difficultyCurrent={difficultyCurrent}/>
            <Button text={'проффесионал'} difficulty={'hard'} difficultySettup={difficultySettup} difficultyCurrent={difficultyCurrent}/>
		</div>
	);
}

export default Settings;