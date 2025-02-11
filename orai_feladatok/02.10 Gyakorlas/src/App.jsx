import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home,Services,About,Contact,Navbar} from './components/pages'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Contact' element={<Contact />} /> 
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='/About' element={<About />} />
      </Routes>
      </Navbar>
      </div>
    </>
  )
}

export default App
