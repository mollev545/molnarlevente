import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Home,Services,About,Contact,Navbar} from './components/pages'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Gyakorlás</h1>
      </div>
      <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/Contact' element={<Contact />} /> 
        <Route path='/Navbar' element={<Navbar />} />

        <Route path='/About' element={<About />} />

      </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
