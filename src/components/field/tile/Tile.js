import './tile.scss'

function Tile({index, item, openTile, flagTile}){
    let cssClasses = 'tile'
    item.open === false ? cssClasses += ' closed' : cssClasses += ' open'
    item.bomb === true && (cssClasses += ' bomb')
    if(item.status === 'flag' && item.open === false){
        cssClasses += ' flag'
    }
    function leftClick(){
        if(item.passage === false && item.status === 'free'){
            openTile(index)
        }
    }
    function rightClick(e){
        e.preventDefault()
        if(item.passage === false){
            flagTile(index)
        }
    }
    return (
        <div className={cssClasses} onClick={leftClick} onContextMenu={rightClick}>
            {item.status === 'unknown' && <span>?</span>}
            {(item.number !== 0 && item.open === true && item.bomb === false) && <span>{item.number}</span>}
        </div>
    )
}

export default Tile;