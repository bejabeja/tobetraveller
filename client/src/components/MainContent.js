import React, {useState} from 'react'
import Places from '../places/Places'
import './MainContent.css'

const MainContent = () => {
    const [searchTravel, setSearchTravel] = useState(false)

    const handleButton = () => {
        setSearchTravel(true)
    }

    const Button = ({ onClick, text, className }) => {
        return (
          <button onClick={onClick} className={className}>{text} </button>
        );
      };
  return (
    <div className='app--main-content scrollable-div'>
        {!searchTravel &&
            <div className='tittle-group'>
                <h1 className='title--h1'>Travel Smarter, Dream Bigger</h1>
                <h2 className='title--h2'>Your Journey Begins Here</h2>
                <Button className='primary-button' onClick={handleButton} text='Start'> </Button>
            </div>
        }
        
        
        {searchTravel &&
        <>
            <Places></Places>
            <Places></Places>
        </> }
        
      </div>
  )
}

export default MainContent