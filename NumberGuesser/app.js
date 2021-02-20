let min = 1,
    max = 10,
    winningNumber = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input')
message = document.querySelector('.message')

//assign ui min and max
minNum.textContent = min
maxNum.textContent = max

//listen to play again
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload()
    }
})


//listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value)

    if (isNaN(guess) || guess < min || guess > max) {
        return setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    //check if winning number

    if (guess === winningNumber) {

        gameOver(true, `Winner!`)

    } else {
        //wrong number
        guessesLeft -= 1

        if (guessesLeft === 0) {
            gameOver(false, `Out of Guesses, the winning number was ${winningNumber}`)

        } else {
            guessInput.style.bordercolor = 'red'
            message.style.color = 'red'
            //clear input
            guessInput.value = ''

            setMessage(`Not correct, ${guessesLeft} attempts left`)
        }

    }
})



function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg

}

function gameOver(won, msg) {
    let color
    won === true ? color = 'green' : color = 'red'

    //Disable input
    guessInput.disabled = true
    //change border color
    guessInput.style.bordercolor = color

    message.style.color = color
    setMessage(msg)

    guessBtn.value = `Play Again?`
    guessBtn.className += 'play-again'
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}