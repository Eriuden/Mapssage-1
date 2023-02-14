import React, { useState, useContext} from 'react'
import { UidContext } from './appContext'
import { useSelector } from "react-redux"
import {Link} from "react-router-dom"
import { Squash as Hamburger} from "hamburger-react"
import Logout from './Logout'



export default function Header() {
  const [ hamburger, setHamburger] = useState(false)
  const uid= useContext(UidContext)
  const userData = useSelector((state) => state.userReducer)

  return (
    <div>
      <div className='bg-gradient-to-r from-cyan-300  via-slate-50 to-purple-300 mb-0'>
        <h1 className='mb-3'>Mapssage</h1>
      </div>

      <nav className='hidden bg-gradient-to-r from-cyan-300 via-slate-50 to-purple-300 flex-row justify-around mt-0 sm:flex '>
        <Link to={"/"}>Acceuil</Link>
        { uid ? (
          <Link to={"/user-profile/:id"}>
            <h5>Bienvenue{userData.name}</h5>
          </Link>
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
          <Link className='mx-1' to={"/user-profile/:id"}>
            <h5>Bienvenue{userData.name}</h5>
          </Link>
        ): (
          <>
            <Link className='mx-1' to={"/connexion"}>Connexion</Link>
            <Link className='mx-1' to={"/inscription"}>Inscription</Link>
          </>
        )}
      </nav>
      ):""}
    </div>
  )
}
