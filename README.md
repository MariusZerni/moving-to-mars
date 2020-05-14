
## ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)  General Assembly, Software Engineering Immersive

# Moving To Mars

## Overview

Moving To Mars is my first project I developed during the General Assembly software engineering immersive course. We were given a list of projects to choose from. I knew from the beginning that I would like to create a replica of the 'Space Invaders' game.

In this game, first you'll have to kill all the enemies that are in your way to achieve your dream to move to Mars.

You can check the game [here](https://mariuszerni.github.io/project-1/)

## How to play

- Use ← → arrow keys to move the player
- You need to avoid the bombs dropped by the enemies
- Start with 3 lives
- If you're touched by a bomb you lose one life (hit 3 times, game over)
- Every time you kill an enemy you get 100 points.
- If you manage to kill all the enemies, you win the game


## Brief

- Render a game in the browser
- Building the logic for the enemies to move from left to right and down & visually display scoreboard
- Include separate HTML / CSS / JavaScript files
- DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online 


## Technologies used

- Vanilla JavaScript
- HTML
- CSS


## Approach

First I've created a function in JavaScript where I used a loop to create the grid where I displayed the enemies and the player. The loop is creating a 20*20 grid.

## Displaying the grid
I'm initialising a variable 'width' with the value of 20 and another variable that stores the number of cells on the grid (width * width).

```js
function createGrid(grid) {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    grid.appendChild(cell)
    cells.push(cell)
  }
}
```

## Enemies' movement
To make the game more difficult, I've created a function where all the enemies are moving to the right, left and down. In order to do that I had to use a 'setInterval' to move them every 2 seconds. First I had to keep track of the the current position of the enemies and increment it to make them moving forward (implemented by adding/removing CSS classes).

Once the enemies are reaching the right margin of the grid, they are then moving down one column and same on the left margin. For this logic to work I've created a for loop to check if the enemies are on the last column (cell number dividing by 20), then instead of adding 1 we're adding 20 which is the width of the grid, same is for the left margin, but here we're subtracting 20.

If the player didn't kill the enemies before reaching the bottom of the grid, then the clearInterval function is getting triggered and stopping the game.

```js
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
```

## Player control
I also had to create a function where the user can control the player to be able to shoot the enemies.

I've added an event listener 'keydown' with 'ArrowRight' and 'ArrowLeft'. Every time the right arrow key is pressed, the player is moving one cell to the right, and similarly for the left arrow key.

The player is able to move only on the last row. 

To enforce that, I'm checking if the player's cell index is in the interval [380, 399] (meaning [cells.length - 20, cells.length - 1]).


```js
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
  playerShooting()
}
```

## Player Shotting
Next I have a function where the player can shoot the enemies. This function is called in the controlPlayer function which is shooting automatically every 0.05 seconds. 

```js
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
      audio.src = 'sounds/invaderkilled.wav'
      audio.play()
    }
  }, 50)
}
```

## Enemies collision with the laser
Now that I have the function that is shooting enemies I have to check if the player managed to hit an enemy. For this I've created a function to check if the laser is in the same cell as the enemy, if so, I'm removing the enemy and also the laser.

```js
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
```

## Dropping bombs 
Because moving to Mars is not easy, the enemies are dropping bombs. For that I'm using two JavaScript methods: 'Math.floor' and 'Math.random' that are generating a random number. The number generated is related with an enemy that is inside that cell. 

```js
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
```


To establish which enemies can drop bombs I had to create a function to find the most advanced enemies from each row. 

```js
function findMostAdvancedInvaders() {
  const objectInvadersPerColumn = {}
  for (let i = 0; i < invaders.length; i++) {
    const key = invaders[i] % 20
    objectInvadersPerColumn[key] = invaders[i]
  }
  return Object.values(objectInvadersPerColumn)
}
```


## Updating the score
Because it is a game, we need to keep score and to know who's won. For that I have a function to update the score and let the user know if he won.

```js
function updateScore(scoreSelector, score) {
  scoreSelector.innerHTML = score
  if (score === 6000) {
    stopGame(true)
  }
}
```

## Challenges
- The biggest challenge of this project was creating the logic of making the enemies move in the right direction. The logic that I created with incrementing/decrementing the enemy position was working only till the enemies reached the end of the row. For that I had to come up with another logic to make them move down one row and then move them in the opposite diection.

## Wins
- My biggest challenge was also my biggest win. I knew from the start, once I'll have this logic working, I'm half way through. Even though it took me a bit more time than I expected, having that done I've ended up having a better understanding on how to create algorithms in JavaScript.

## Potential future features

- Adding difficulty levels
- More & better sounds

## Lessons learned

- Spending more time on planning at the beginning 
- Testing the code