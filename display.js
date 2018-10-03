const selectionComplete = require('./selectionComplete')

function display(choiceObj, progressLog, triggerFn){
    let choiceCount = 1
    if(Array.isArray(choiceObj)){
        choiceCount = choiceObj[0]
        choiceObj = choiceObj[1]
    }

    let holder = document.getElementById('holder')
    holder.innerHTML = ''

    let choiceArray = Object.keys(choiceObj)
    
    let options = []
    let placeholder = 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif'
    for(let choices of choiceArray){
        options.push(`
        <div class="card">
            <img src="${placeholder}" alt="image of ${choices}">
            <h3>${choices}</h3>
            <p>${choiceObj[choices].desc}</p>
            <div class="reverse">
            </div>
        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    let finalChoice = []
    let prepCardsForSelection = function(e){select2(e, choiceCount, finalChoice, progressLog, triggerFn)}
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', prepCardsForSelection)
    }  
}


function select2(event, numOfChoices,finalChoice, progressLog, triggerFn){
    let origLength = progressLog.length;
    let next = document.querySelector('#next')
    let choiceCount = numOfChoices - finalChoice.length
    let logSelectionMoveOn = function(e){selectionComplete(progressLog, finalChoice, triggerFn)}

    if(choiceCount !== 0){ //have choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[1].innerHTML), 1)
            // next.removeEventListener('click', logSelectionMoveOn)
        }
        else{
            event.currentTarget.classList.add('selected')
            choiceCount--
            finalChoice.push(event.currentTarget.children[1].textContent)
        }
    }
    else{                   //have no choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[1].innerHTML), 1)
            // next.removeEventListener('click', logSelectionMoveOn)
        }
        else{
            console.log('nope')
            // return false;
        }
    }
    
    if(choiceCount === 0 && finalChoice.length === numOfChoices){
        next.classList.remove('hidden')
        // next.addEventListener('click', logSelectionMoveOn, {once:true})
        next.onclick = logSelectionMoveOn
    }else if(choiceCount !== 0){
        next.classList.add('hidden')
        // next.removeEventListener('click', logSelectionMoveOn)
    }
    // if(progressLog.length === origLength){
    //     progressLog.push(finalChoice)
    // }
    // else if(progressLog.length > origLength){
    //     progressLog.pop()
    //     progressLog.push(finalChoice)
    // }
}

module.exports = display