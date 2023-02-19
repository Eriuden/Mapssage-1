import React, { useEffect} from 'react'
import { getSalons } from '../redux/actions/salons.action'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Comments from '../components/comments/comments'

/*
Il faudrait
un carrousel des images en haut à gauche
sur l'autre côté, le nom et une description
plus bas, le type de massage, les types de clients, masseurs-masseuses, etc
encore plus bas, les avis/commentaires
*/ 
export default function SalonPage() {
  const user = useSelector((state)=> state.userReducer)
  const salon = useSelector((state)=> state.salonReducer)
  const dispatch = useDispatch()

  useEffect(()=> {
    getSalons(salon._id)
  })
  return (
    <div>
      <h2>{salon.name}</h2>
      <img src={salon.picture}/>
      <p>{salon.address}</p>
      <p>{salon.cp}</p>
      <p>{salon.town}</p>
      <p>{salon.massage}</p>
      <p>{salon.potentialClients}</p>
      <p>{salon.employeesGender}</p>

      <div>
        <Comments commentProps={salon}/>
      </div>
    </div>
  )
}
