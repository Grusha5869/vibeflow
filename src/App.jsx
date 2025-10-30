import './App.css'
import { Routes, Route, Outlet } from 'react-router'
import Navigator from './components/navigator'
import Header from './components/header'
import Main from './components/Main'
import Trends from './components/Trends'
import Favorite from './components/Favorite'

function App() {

  return (
    <div className="flex">
        <Navigator />
        <div className="w-full">
          <Header />
          <Routes>
            <Route element={<Layout />} />
            <Route index element={<Main />} />
            <Route path='/trends' element={<Trends />} />
            <Route path='/favorite' element={<Favorite />} />
          </Routes>
        </div>
        
    </div>
  )
}
function Layout() {
  return <Outlet />;
}

export default App
