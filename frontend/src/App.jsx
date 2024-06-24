import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  let [filter,setFiler] = useState('');

  return (
    <>
      <Navbar setFiler={setFiler}/>
      <div className='pt-5'>
        <Outlet context={filter}/>
      </div>
    </>
  )
}

export default App
