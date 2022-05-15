import { useState, useEffect } from 'react';
import Tile from './tile/Tile';
import openMoreTiles from './logic';
import bombIMG from './bomb.png'
import clockIMG from './clock.png'
import './field.scss'

let interval

function Field({difficulty}) {
	const [currentDifficulty, setCurrentDifficulty] = useState()
	const [bombs, setBombs] = useState()
	const [scheme, setScheme] = useState([])
	const [cssClasses, setCssClasses] = useState('field')
	const [firstOpen, setFirstOpen] = useState(true)
	const [timer, setTimer] = useState()
	const [cssEnd, setCssEnd] = useState('game-box')
	function startNewGame(){
		clearInterval(interval)
		scheme.length = 0
		setCurrentDifficulty(difficulty)
		setCssClasses(`field field-${difficulty}`)
		setCssEnd('game-box')
		setFirstOpen(true)
		setTimer(0)
		let coordX
		let coordY
		if(difficulty === 'easy'){
			setBombs(10)
			coordX = 11
			coordY = 11
		}else if(difficulty === 'normal'){
			setBombs(40)
			coordX = 17
			coordY = 17
		}else if(difficulty === 'hard'){
			setBombs(99)
			coordX = 31
			coordY = 17
		}
		for(let x = 1; x < coordX; x++){
			for(let y = 1; y < coordY; y++){
				let tile = {X: x, Y: y, number: 0, open: false, bomb: false, status: 'free', passage: false}
				scheme.push(tile)
			}
		}
		setScheme([...scheme])
	}
	useEffect(() => {
		startNewGame()
	}, [])
	function openTile(index){
		let checkWin = 0
		if(scheme[index].bomb === false){
			let bias
			let schemeWidth
			currentDifficulty === 'easy' && (bias = 10)
			currentDifficulty === 'normal' && (bias = 16)
			currentDifficulty === 'hard' && (bias = 16)
			currentDifficulty === 'hard' ? schemeWidth = 30 : schemeWidth = bias
			if(firstOpen === true){
				scheme[index].open = true
				if(scheme[index].Y !== 1){
					scheme[index - 1].open = true
				}
				if(scheme[index].Y !== 1 && scheme[index].X !== schemeWidth){
					scheme[index - 1 + bias].open = true
				}
				if(scheme[index].X !== schemeWidth){
					scheme[index + bias].open = true
				}
				if(scheme[index].X !== schemeWidth && scheme[index].Y !== bias){
					scheme[index + bias + 1].open = true
				}
				if(scheme[index].Y !== bias){
					scheme[index + 1].open = true
				}
				if(scheme[index].Y !== bias && scheme[index].X !== 1){
					scheme[index + 1 - bias].open = true
				}
				if(scheme[index].X !== 1){
					scheme[index - bias].open = true
				}
				if(scheme[index].X !== 1 && scheme[index].Y !== 1){
					scheme[index - bias - 1].open = true
				}
				let remainderBomb = bombs
				let remainderTile = scheme.length - 9
				scheme.forEach(element => {
					if(element.open === false){
						let random = Math.random()
						let chance = remainderBomb / remainderTile
						if(chance > random){
							element.bomb = true
							remainderBomb--
						}
						remainderTile--
					}
				})
				scheme.forEach((element, localIndex) => {
					if(element.Y !== 1){
						scheme[localIndex - 1].bomb === true && element.number++
					}
					if(element.Y !== bias){
						scheme[localIndex + 1].bomb === true && element.number++
					}
					if(element.X !== 1){
						scheme[localIndex - bias].bomb === true && element.number++
					}
					if(element.X !== schemeWidth){
						scheme[localIndex + bias].bomb === true && element.number++
					}
					if(element.Y !== 1 && element.X !== 1){
						scheme[localIndex - bias - 1].bomb === true && element.number++
					}
					if(element.Y !== 1 && element.X !== schemeWidth){
						scheme[localIndex + bias - 1].bomb === true && element.number++
					}
					if(element.X !== 1 && element.Y !== bias){
						scheme[localIndex - bias + 1].bomb === true && element.number++
					}
					if(element.X !== schemeWidth && element.Y !== bias){
						scheme[localIndex + bias + 1].bomb === true && element.number++
					}
				})
				interval = setInterval(startTimer, 1000)
			}
			openMoreTiles(scheme, index, bias, schemeWidth)
			setFirstOpen(false)
		}else if(scheme[index].bomb === true){
			lose()
			checkWin--
		}
		scheme.forEach((element) => {
			if(element.bomb === false && element.open === false){
				checkWin++
			}
		})
		checkWin === 0 && win()
		setScheme([...scheme])
	}
	function startTimer(){
		setTimer((actual) => actual + 1)
	}
	function flagTile(index){
		if(scheme[index].open === false && firstOpen === false){
			if(scheme[index].status === 'free'){
				scheme[index].status = 'flag'
				setBombs((actual) => actual - 1)
			}else if(scheme[index].status === 'flag'){
				scheme[index].status = 'unknown'
				setBombs((actual) => actual + 1)
			}else if(scheme[index].status === 'unknown'){
				scheme[index].status = 'free'
			}
		}
		setScheme([...scheme])
	}
	function lose(){
		scheme.forEach(element => {
			element.open = true
		})
		clearInterval(interval)
		setCssEnd('game-box lose')
		scheme.forEach((element) => {
			element.passage = true
		})
		setScheme([...scheme])
	}
	function win(){
		clearInterval(interval)
		setCssEnd('game-box win')
		scheme.forEach((element) => {
			element.passage = true
		})
		setScheme([...scheme])
	}
	return (
		<div className={cssEnd}>
			<div className='info-panel'>
				<div className='panel-bombs'><img src={bombIMG} alt='БИМБА'/><span>{bombs}</span></div>
				<button onClick={startNewGame}>Рестарт</button>
				<div className='panel-timer'><img src={clockIMG} alt='Часики'/><span>{timer}</span></div>
			</div>
			<div className={cssClasses}>
				{scheme.map((item, index) => (
					<Tile key={index} index={index} item={item} openTile={openTile} flagTile={flagTile}/>
				))}
			</div>
		</div>
	);
}

export default Field;