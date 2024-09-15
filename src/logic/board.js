import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      const [a, b, c] = combo

      console.log(a, b, c, boardToCheck[a], boardToCheck[b], boardToCheck[c])
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }

    // Sin ganador
    return null
}