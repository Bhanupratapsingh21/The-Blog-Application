import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {authlogin,logout} from "./Store/AuthSlice"
import authService from './Appwrite/auth'
import './App.css'
import { Header , Footer } from './Componets/index'
import { Outlet } from 'react-router-dom'
function App() {
 
  const [loading , setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(authlogin({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-black text-white '>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
