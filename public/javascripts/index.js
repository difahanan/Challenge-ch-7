const playerAttack = document.querySelectorAll('.player-attack')
const comAttack = document.querySelectorAll('.com-attack')
const refreshButton = document.getElementById("refresh")
const vsSign = document.getElementById("versus")
const playerWinSign = document.getElementById("player-win")
const comWinSign = document.getElementById("com-win")
const drawSign = document.getElementById("draw")

const changeBackground = (element) => {
    element.style.backgroundColor = "#C4C4C4"
    element.style.borderRadius = "20%"
}

const draw = () => {
    drawSign.style.visibility = "visible"
}

const playerWin = () => {
    playerWinSign.style.visibility = "visible"
}

const comWin = () => {
    comWinSign.style.visibility = "visible"
}

refreshButton.addEventListener('click', function reset() {
    location.reload()
})
let buttonClicked = false
playerAttack.forEach((attack) => {
    attack.addEventListener('click', function onClick() {
        if (buttonClicked) {
            return
        }

        let playerSelected = attack
        changeBackground(playerSelected)

        let randomNum = Math.floor(Math.random() * comAttack.length)

        let comSelected = comAttack[randomNum]
        changeBackground(comSelected)

        vsSign.style.visibility = "hidden"
        if (playerSelected.className.split(' ')[1] === comSelected.className.split(' ')[1]) {
            draw()
        }
        else if (playerSelected.className.split(' ')[1] === "rock") {
            if (comSelected.className.split(' ')[1] === "paper") {
                comWin()
            } else {
                playerWin()
            }
        }
        else if (playerSelected.className.split(' ')[1] === "paper") {
            if (comSelected.className.split(' ')[1] === "scissors") {
                comWin()
            } else {
                playerWin()
            }
        }
        else {
            if (comSelected.className.split(' ')[1] === "rock") {
                comWin()
            } else {
                playerWin()
            }
        }
        buttonClicked = true
    })
})