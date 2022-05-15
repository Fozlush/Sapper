function openMoreTiles(scheme, index, bias, schemeWidth){
    scheme[index].open = true
    scheme[index].passage = true
    if(scheme[index].number === 0 && scheme[index].bomb === false){
        if(scheme[index].Y !== 1){
            scheme[index - 1].open = true
        }
        if(scheme[index].Y !==1 && scheme[index].X !== schemeWidth){
            scheme[index + bias - 1].open = true
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
        if(scheme[index].Y !== 1){
            if(scheme[index - 1].number === 0 && scheme[index - 1].passage === false){
                openMoreTiles(scheme, index - 1, bias, schemeWidth)
            }
        }
        if(scheme[index].Y !== 1 && scheme[index].X !== schemeWidth){
            if(scheme[index + bias - 1].number === 0 && scheme[index + bias - 1].passage === false){
                openMoreTiles(scheme, index + bias - 1, bias, schemeWidth)
            }
        }
        if(scheme[index].X !== schemeWidth){
            if(scheme[index + bias].number === 0 && scheme[index + bias].passage === false){
                openMoreTiles(scheme, index + bias, bias, schemeWidth)
            }
        }
        if(scheme[index].X !== schemeWidth && scheme[index].Y !== bias){
            if(scheme[index + bias + 1].number === 0 && scheme[index + bias + 1].passage === false){
                openMoreTiles(scheme, index + bias + 1, bias, schemeWidth)
            }
        }
        if(scheme[index].Y !== bias){
            if(scheme[index + 1].number === 0 && scheme[index + 1].passage === false){
                openMoreTiles(scheme, index + 1, bias, schemeWidth)
            }
        }
        if(scheme[index].Y !== bias && scheme[index].X !== 1){
            if(scheme[index + 1 - bias].number === 0 && scheme[index + 1 - bias].passage === false){
                openMoreTiles(scheme, index + 1 - bias, bias, schemeWidth)
            }
        }
        if(scheme[index].X !== 1){
            if(scheme[index - bias].number === 0 && scheme[index - bias].passage === false){
                openMoreTiles(scheme, index - bias, bias, schemeWidth)
            }
        }
        if(scheme[index].X !== 1 && scheme[index].Y !== 1){
            if(scheme[index - bias - 1].number === 0 && scheme[index - bias - 1].passage === false){
                openMoreTiles(scheme, index - bias - 1, bias, schemeWidth)
            }
        }
    }
    return
}

export default openMoreTiles;