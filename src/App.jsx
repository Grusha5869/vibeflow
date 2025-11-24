import './App.css'
import { config } from './config'
import { Routes, Route, Outlet } from 'react-router'
import Navigator from './components/Navigator'
import Header from './components/Header'
import Main from './components/pages/Main'
import Trends from './components/pages/Trends'
import Favorite from './components/pages/Favorite'
import ReferenceWindow from './components/Reference-window'
import { useEffect, useState } from 'react'
import { MiniPlayerContext } from './context/Mini-player-context'

function App() {
  const [reference, setReference] = useState(false);
  const [openMiniPlayer, setOpenMiniPlayer] = useState(false);

  const contextValue = {
    openMiniPlayer,
    setOpenMiniPlayer,
  };

  return (
    <>
      <MiniPlayerContext.Provider value={contextValue}>

        {reference && (
          <ReferenceWindow />
        )}

        <div className="flex">
          <Navigator />

          <div className="w-full">
            
            <Header 
              reference={reference} 
              setReference={setReference}
            />
    
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Main />} />
                <Route path='trends' element={<Trends />} />
                <Route path='favorite' element={<Favorite />} />
              </Route>
            </Routes>

            {openMiniPlayer && (
              <div className="w-full h-10 bg-amber-100"></div>
            )}
          </div>
            
        </div>

      </MiniPlayerContext.Provider>
    </>
    
  )
}
function Layout() {
  return <Outlet />;
}

export default App
