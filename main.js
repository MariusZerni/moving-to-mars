


function projectOne() {

  const width = 20
  const gridCellCount = width * width
  const cells = []
  let player = 389
  let laser = 0
  const invaders = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135]



  let invadersDirection = 'right'



  const grid = document.querySelector('.grid')

  createGrid(grid)


  //create player
  cells[player].classList.add('player')

  //create invaders
  let invader = invaders.forEach((invader) => {
    cells[invader].classList.add('invaders')
  })

  controlPlayer()

  moveInvaders()


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

    const intervalId = setInterval(() => {
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

    })

    let firstRun = true

    setInterval(() => {


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
        console.log('firstRow')
        cells[laser].classList.remove('laser')
        laser = player - 20
      }

      cells[laser].classList.add('laser')
      makeInvadersDisappear()

    }, 600)




  }


  function makeInvadersDisappear() {

    let foundInvader = -1
    invaders.forEach((invader) => {
      if (invader === laser) {
        cells[invader].classList.remove('invaders')
        foundInvader = invader
      }
    })
    if (foundInvader !== -1) {
      const index = invaders.indexOf(foundInvader)
      invaders.splice(index,1)
      console.log(foundInvader + ' ' + invaders)
    }

  }
  makeInvadersDisappear()




  function generateBombs() {
    const secondIntervalId = setInterval(() => {
      const invadersDropBombs = invaders.slice(-12)
      let randomInvader = invadersDropBombs[Math.floor(Math.random() * (invadersDropBombs.length))]
      cells[randomInvader].classList.add('bombs')
      console.log(randomInvader)
      setInterval(() => {

        if (randomInvader < 399) {
          cells[randomInvader].classList.remove('bombs')


          if (randomInvader + 20 < 399) {
            randomInvader += 20
            cells[randomInvader].classList.add('bombs')
          } else {
            cells[randomInvader].classList.remove('bombs')
          }
        }
      }, 500)

    }, 2000)
  }
  generateBombs()














}


window.addEventListener('DOMContentLoaded', projectOne)