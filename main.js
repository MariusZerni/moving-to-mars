
const width = 20
const gridCellCount = width * width
let cells = []
let player = 389
let laser = 0
let score = 0
let lives = 3
let invaders = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]
let invadersDirection = 'right'
let controlPlayerInterval
let intervalId
let secondIntervalId
let newScore
let livesRemaining
let isGameOver = false
let isStarted = false




function projectOne() {


  const start = document.querySelector('.start')
  const play = document.querySelector('.play')


  const grid = document.querySelector('.grid')



  play.addEventListener('click', () => {

    if (isStarted === false) {

      player = 389
      laser = 0
      score = 0
      lives = 3

      invaders = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]
      invadersDirection = 'right'

      isStarted = true

      if (isGameOver) {
        cells = []

        while (grid.hasChildNodes()) {
          (grid.firstChild.nodeName)
          grid.removeChild(grid.firstChild)
        }

        document.querySelector('.grid-game-over').style.display = 'none'

        recreateGrid()

        isGameOver = false

        playerShooting()

      } else {
        controlPlayer()

      }


      generateBombs()
      moveInvaders()


    }
  })



  start.addEventListener('click', () => {

    recreateGrid()
  })



  function recreateGrid() {

    grid.style.display = 'flex'
    const paragraphs = document.querySelectorAll('p')
    paragraphs.forEach((p) => {
      p.style.display = 'block'
    })

    newScore = document.querySelector('.score')
    updateScore(newScore, score)

    livesRemaining = document.querySelector('.lives')
    livesRemaining.innerHTML = lives

    createGrid(grid)

    //create player
    cells[player].classList.add('player')

    //create invaders
    invaders.forEach((invader) => {

      cells[invader].classList.add('invaders')

    })


    play.style.display = 'block'
    start.style.display = 'none'



  }


}






window.addEventListener('DOMContentLoaded', projectOne)



function stopGame(wonGame) {

  if (isGameOver === false) {
    isGameOver = true
    clearInterval(controlPlayerInterval)
    clearInterval(intervalId)
    clearInterval(secondIntervalId)

    if (wonGame === false) {

      document.querySelector('.grid-game-over').style.display = 'flex'
      document.querySelector('.play').innerHTML = 'Play Again'

    } else {
      document.querySelector('.grid-game-over').style.display = 'flex'
      document.querySelector('.play').innerHTML = 'Play Again'
      document.querySelector('.game-over').innerHTML = 'You win!'
    }
    isStarted = false
  }

}


function updateScore(scoreSelector, score) {
  scoreSelector.innerHTML = score

  if (score === 600) {

    stopGame(true)


  }

}



function createGrid(grid) {

  for (let i = 0; i < gridCellCount; i++) {

    const cell = document.createElement('div')
    cell.innerHTML = i

    cell.classList.add('cell')

    grid.appendChild(cell)
    cells.push(cell)

  }
}

function moveInvaders() {

  intervalId = setInterval(() => {
    if (invadersDirection === 'right') {

      for (let i = 0; i < invaders.length; i++) {
        const invader = invaders[i]
        cells[invader].classList.remove('invaders')
      }

      let lastColumn = false

      for (let i = 0; i < invaders.length; i++) {
        const invader = invaders[i]
        if ((invader + 1) % 20 === 0) {
          lastColumn = true
        }
      }

      for (let i = 0; i < invaders.length; i++) {

        let invader = invaders[i]

        if (lastColumn) {
          invader = invader + 20
        } else {
          invader = invader + 1
        }

        invaders[i] = invader
        cells[invader].classList.add('invaders')
      }

      if (lastColumn) {
        invadersDirection = 'left'
      }

    } else if (invadersDirection === 'left') {

      for (let i = 0; i < invaders.length; i++) {
        const invader = invaders[i]

        cells[invader].classList.remove('invaders')
      }

      let firstColumn = false
      for (let i = 0; i < invaders.length; i++) {
        const invader = invaders[i]
        if ((invader) % 20 === 0) {
          firstColumn = true
        }
      }

      for (let i = 0; i < invaders.length; i++) {

        let invader = invaders[i]

        if (firstColumn) {
          invader = invader + 20
        } else {
          invader = invader - 1
        }

        invaders[i] = invader
        cells[invader].classList.add('invaders')
      }

      if (firstColumn) {
        invadersDirection = 'right'
      }
    }


    invaders.forEach((invader) => {
      if (invader >= 380) {
        clearInterval(intervalId)
      }
    })

  }, 2000)
}


function controlPlayer() {


  document.addEventListener('keydown', (event) => {
    console.log(player)
    if (event.key === 'ArrowRight') {
      if (player === cells.length - 1) {
        return
      }

      cells[player].classList.remove('player')
      player += 1
      cells[player].classList.add('player')
    } else if (event.key === 'ArrowLeft') {
      if (player === cells.length - 20) {
        return
      }

      cells[player].classList.remove('player')
      player -= 1
      cells[player].classList.add('player')
    }
    console.log('after' + player)


  })

  playerShooting()



}

function playerShooting() {
  let firstRun = true

  controlPlayerInterval = setInterval(() => {


    if (firstRun) {
      laser = (player - 20)
      firstRun = false
    } else if (!(laser / 20 === 0)) {
      cells[laser].classList.remove('laser')
      if (laser - 20 >= 0) {
        laser -= 20
      } else {
        laser = player - 20
      }

    } else if (laser / 20 === 0) {
      cells[laser].classList.remove('laser')
      laser = player - 20
    }

    cells[laser].classList.add('laser')
    if (makeInvadersDisappear()) {
      laser = player - 20

    }

  }, 200)

}

function makeInvadersDisappear() {

  let foundInvader = -1
  invaders.forEach((invader) => {
    if (invader === laser) {
      cells[invader].classList.remove('invaders')
      foundInvader = invader
      cells[laser].classList.remove('laser')
      score += 100
      updateScore(newScore, score)

    }

  })
  if (foundInvader !== -1) {
    const index = invaders.indexOf(foundInvader)
    invaders.splice(index, 1)

  }

  return (foundInvader !== -1)

}


function generateBombs() {
  secondIntervalId = setInterval(() => {
    const invadersDropBombs = findMostAdvancedInvaders()

    let randomInvader = invadersDropBombs[Math.floor(Math.random() * (invadersDropBombs.length))]

    randomInvader += 20

    cells[randomInvader].classList.add('bombs')


    const thirdIntervalId = setInterval(() => {
      if (isGameOver) {
        clearInterval(thirdIntervalId)
      }

      if (randomInvader < 399) {
        cells[randomInvader].classList.remove('bombs')

        if (randomInvader + 20 < 399) {
          randomInvader += 20
          cells[randomInvader].classList.add('bombs')
        } else {
          cells[randomInvader].classList.remove('bombs')

          if (randomInvader === player) {
            lives -= 1
            livesRemaining.innerHTML = lives

            if (lives === 0) {
              clearInterval(thirdIntervalId)
              stopGame(false)
            }

          }
          clearInterval(thirdIntervalId)

        }
      }
    }, 300)

  }, 1000)

}


function findMostAdvancedInvaders() {

  const objectInvadersPerColumn = {}

  for (let i = 0; i < invaders.length; i++) {
    const key = invaders[i] % 20

    objectInvadersPerColumn[key] = invaders[i]
  }
  return Object.values(objectInvadersPerColumn)
}






