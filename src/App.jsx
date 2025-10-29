import './App.css'
import { Routes, Route } from 'react-router'
import Navigator from './components/navigator'
import Header from './components/header'

function App() {

  return (
    <div className="flex">
        <Navigator />
        <Header />
        {/* <Routes>
        <Route path='/' element={<Navigator />} />
      </Routes> */}
    </div>
  )
}

export default App
