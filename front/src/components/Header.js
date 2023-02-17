import React, { useState, useContext} from 'react'
import { UidContext } from './appContext'
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { Squash as Hamburger} from "hamburger-react"
import Logout from './Logout'
import { getSalons } from '../redux/actions/salons.action'



export default function Header() {
  const [ hamburger, setHamburger] = useState(false)
  const [ search, setSearch] = useState("")
  const uid= useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  //améliorer la recherche pour ce projet, en faire un à sa place, EN HEADER

  const getSalonByKeyword = () => {
    e.preventDefault()
      setSearch(e.currentTarget.value)
      if(search.length > 0){
          getSalons(search)
          .then(res=>{
              getSalons(res.results);
          })
      }
  }
   
  return (
    <div>
      <div className='bg-gradient-to-r from-purple-300 mb-0'>
        <h1 className='mb-3'>Mapssage</h1>
      </div>

      <nav className='hidden bg-gradient-to-r from-purple-300 flex-row justify-around mt-0 sm:flex '>
        <Link to={"/"}>Acceuil</Link>
        { uid ? (
          <>
            <Link to={"/user-profile/:id"}>
              <h5>Bienvenue{userData.name}</h5>
            </Link>

            <Logout/>
          </>
        ): (
          <>
            <Link to={"/connexion"}>Connexion</Link>
            <Link to={"/inscription"}>Inscription</Link>

            
          </>
        )}
      </nav>

      <h2 className='flex m-3 sm:hidden' onClick={() => setHamburger(!hamburger)}>
        <Hamburger/>
      </h2>

      {hamburger ? (
        <nav className='flex flex-col items-start justify-start border-spacing-1 ml-3.5 
        absolute border-2 border-black bg-slate-50 opacity-100 sm:hidden'>

        <Link className='mx-1' to={"/"}>Acceuil</Link>
        { uid ? (
          <>
            <Link className='mx-1' to={"/user-profile/:id"}>
              <h5>Bienvenue{userData.name}</h5>
            </Link>

            <Logout/>
          </>
        ): (
          <>
            <Link className='mx-1' to={"/connexion"}>Connexion</Link>
            <Link className='mx-1' to={"/inscription"}>Inscription</Link>
          </>
        )}
      </nav>
      ):""}

      < div className=''>
        <form action='' className='my-4'>
          <input type="text" className='border-2 border-black mx-2'
           placeholder='Entrez un nom de salon' id="search-input"
           onChange={getSalonByKeyword} value={search}/>
           
           <input type="submit" value="rechercher" className='border-2 border-black rounded-md px-2'/>
           
        </form>
      </div>
    </div>
  )
}
