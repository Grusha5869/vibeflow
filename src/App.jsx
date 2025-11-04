import './App.css'
import { config } from './config'
import { Routes, Route, Outlet } from 'react-router'
import Navigator from './components/Navigator'
import Header from './components/Header'
import Main from './components/Main'
import Trends from './components/Trends'
import Favorite from './components/Favorite'
import { useEffect } from 'react'

function App() {
  return (
    <div className="flex">
        <Navigator />
        <div className="w-full">
          <Header />
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Main />} />
              <Route path='trends' element={<Trends />} />
              <Route path='favorite' element={<Favorite />} />
            </Route>
          </Routes>
        </div>
        
    </div>
  )
}
function Layout() {
  return <Outlet />;
}

export default App
