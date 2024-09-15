import canela from '../assets/canela.webp'
import link from '../assets/link.webp'

export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }

    let imgRender = ''
    if( children == 'canela.webp' ) {
        imgRender = <img src={canela} alt={canela} width="50px" />
    } else if (children == 'link.webp') {
        imgRender = <img src={link} alt={link} width="50px" />
    } else {
        imgRender = ''
    }
    // const imgRender = (children === null) ? '' :  width="50px" />
    
    return (
      <div onClick={handleClick} className={className}>
        { imgRender }
      </div>
    )
  }