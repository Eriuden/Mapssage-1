import React, { useEffect, useState } from 'react'
import { getSalons } from '../redux/actions/salons.action'
import { useDispatch } from 'react-redux'
import SalonCard from './salonCard'

export default function SearchResult({SearchProps}) {

  const [salonsData, setSalonsData] = useState([])

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getSalons)
  }, setSalonsData(res.data.results))

  return (
    <div>
      {salonsData.slice(0,20)
      .sort((a,b)=> {
        return a.name - b.name
      })
      .map((salon)=> {
        return <SalonCard key={salon._id} salonProps={SearchProps}/>
      })}
    </div>
  )
}

//Disons le, ca va être aussi difficile que utile pour ma carrière cette recherche
//Il faut que le formulaire soit en Header mais les résultats en home, bord**