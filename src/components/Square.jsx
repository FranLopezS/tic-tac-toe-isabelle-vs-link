export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }

    const imgRender = (children === null) ? '' : <img src={`../src/assets/${children}`} width="50px" />
    
    return (
      <div onClick={handleClick} className={className}>
        { imgRender }
      </div>
    )
  }