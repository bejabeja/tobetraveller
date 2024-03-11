import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [selectData, setSelectData] = useState([])
  const [selectValue, setSelectValue] = useState('')



  useEffect(() => {
    let apiUrl = process.env.API_URL || 'http://localhost:3001/api';

    let processing = true 
    axiosFetchData(processing, apiUrl)
    return() => {
      processing = false
    }
  }, [])


  const axiosFetchData = async(processing, apiUrl) => {
    await axios.get(`${apiUrl}/users`)
    .then(res => {
      if(processing){
        setSelectData(res.data)
      }
    })
    .catch(err => console.log(err))
  }

  const SelectDropdown = () => {
    return (
      <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
        {
          selectData?.map((user, index) => (
            <option value={user.email} key={index}> {user.email}</option>
          ))
        }
      </select>
    )
  }

  const Places = ({ selectData }) => {
    return (
      <div>
        {selectData?.map((user, index) => (
          <div key={index}>
            <p>{user.email}</p>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email){
      setError(<p>'Need to introduce an email'</p>)
     }else{setError('')}

     setError('')
  }

  return (
    <section className='section'>
        <h1>Loading...</h1>
        <form className='loggin--form' action='/api/contact-form'>
            <label>Name</label>
            <input type='text' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)}></input>

            <label>Places</label>
            <Places selectData={selectData}></Places>

            <label>How did you hear about us?</label>
            <SelectDropdown></SelectDropdown>
           
            {error}
            <button type='submit' onClick={handleSubmit}>Login</button>
        </form>
    </section>
  )
}

export default App