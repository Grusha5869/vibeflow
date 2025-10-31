import './App.css'
import { Routes, Route, Outlet } from 'react-router'
import Navigator from './components/navigator'
import Header from './components/header'
import Main from './components/Main'
import Trends from './components/Trends'
import Favorite from './components/Favorite'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = '4aa432b6671f1c7772bbfc0627ecc65c';
        const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json&limit=10`
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error('Ошибка')
        }

        const data = await res.json()
        console.log(data);
        

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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
