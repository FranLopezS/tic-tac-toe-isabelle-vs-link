import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { checkWinnerFrom } from "./logic/board.js"
import { checkEndGame } from "./components/WinnerModal.jsx"

function App() {
  // Actualizar el tablero cada vez, con estado inicial a null en todos.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return (boardFromStorage) ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  // null: no hay ganador; false: hay un empate.
  const [winner, setWinner] = useState(null) 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // No actualizamos la posición si ya tiene algo
    // o si ya hay un ganador.
    if (board[index] || winner) return;

    // No hay que mutar la variable board,
    // se debe usar setBoard aplicando la nueva 
    // variable que crearemos justo debajo.
    const newBoard = [...board] // Se copia el board en nueva variable.
    newBoard[index] = turn // Se pone la ficha del turno correspondiente.
    setBoard(newBoard)

    // Cambiar el turno.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Resetear</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                { board[index] }
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={ turn === TURNS.X }>
          { TURNS.X}
        </Square>
        <Square isSelected={ turn === TURNS.O}>
          { TURNS.O}
        </Square>
      </section>

      <WinnerModal
        winner={winner}
        resetGame={resetGame}
      />
    </main>
  )
}

export default App
