import './App.css'
import About from './components/About'
import HomePage from './components/hero'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Team from './components/Team'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path='/about' element={<About/>}> </Route>
        <Route path='/team' element={<Team/>}> </Route>
        </Routes></BrowserRouter>
    </>
  )
}

export default App
