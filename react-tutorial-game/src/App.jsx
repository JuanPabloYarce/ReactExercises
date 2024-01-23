import './index.css'
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS, winnerCombs } from './constants'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic/logic'

function App () {
  const [actualBoard, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    if (turnFromStorage) return turnFromStorage
    return TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // Intento inicial
    /*     if(board[index] === TURNS.X || board[index] === TURNS.O){
          return;
        } */
    // Correccion

    if (actualBoard[index] || winner) return

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newBoard = [...actualBoard]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    console.log('UseEffect')
    window.localStorage.setItem('board', JSON.stringify(actualBoard))
    window.localStorage.setItem('turn', turn)
  }, [actualBoard, turn])

  // Personal try
  /* const verifyWin = (actualBoard) => {
      for(let i = 0; i < 3; i++){
        if (actualBoard[i] === actualBoard[i + 1] && actualBoard[i] === actualBoard[i + 2] && actualBoard[i] != null) {
          console.log("Win")
          alert("Ganaste")
          if(actualBoard[i] == TURNS.O){
            setWinner(true)
            return
          }
          else {
            setWinner(false)
            return
          }
        }

        if (actualBoard[i] === actualBoard[i + 3] && actualBoard[i + 3] === actualBoard[i + 6] && actualBoard[i] != null) {
          console.log("Win")
          alert("Ganaste")
          if(actualBoard[i] == TURNS.O){
            setWinner(true)
            return
          }
          else {
            setWinner(false)
            return
          }
        }

        if (i == 0 && actualBoard[i] === actualBoard[i + 4] && actualBoard[i + 4] === actualBoard[i + 8] && actualBoard[i] != null) {
          console.log("Win")
          alert("Ganaste")
          if(actualBoard[i] == TURNS.O){
            setWinner(true)
            return
          }
          else {
            setWinner(false)
            return
          }
        }
        if (i == 2 && actualBoard[i] === actualBoard[i + 2] && actualBoard[i + 2] === actualBoard[i + 4] && actualBoard[i] != null) {
          console.log("Win")
          alert("Ganaste")
          if(actualBoard[i] == TURNS.O){
            setWinner(true)
            return
          }
          else {
            setWinner(false)
            return
          }
        }
      }

      return;
    } */

  return (
    <main className='board'>
      <h1>Tic Tac Toe (Triki)</h1>
      <button onClick={resetGame}>Empezar de nuevo </button>

      <section className='game'>
        {
            actualBoard.map((_, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {actualBoard[index]}
                </Square>
              )
            })
          }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O} </Square>

      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

    </main>
  )
}
export default App
