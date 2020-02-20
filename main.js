


const width = 20
const gridCellCount = width * width
const cells = []
let player = 389
let invaders = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 134, 135]
// const invaders = [44, 45, 64, 65]

const rightColumIds = [19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 399]


function projectOne() {
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


}

window.addEventListener('DOMContentLoaded', projectOne)


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

  setInterval(() => {

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
      console.log(invader)
      

      if (lastColumn) {
        invader = invader + 20
      } else {
        invader = invader + 1
      }
      
      invaders[i] = invader
      cells[invader].classList.add('invaders')
      console.log(invader + ' ' + cells[invader].classList.add('invaders'))

    }
  }, 1000)
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
}

function rightColumnStop() {



}