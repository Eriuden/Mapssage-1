import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils'
import DeleteCard from './DeleteCard'
import FavButton from './FavButton'


/* Réserver l'update et le delete à la vraie page*/
//pas le même css que la page, raison de praticité, nom puis photo en collone

//Pourquoi salonsData et pas salonData
//ca permet de check si l'id existe dans toute la liste


export default function SalonCard({salonProps}) {
  const [isLoading, setIsLoading] = useState(true)
  const salonsData = useSelector((state)=> state.salonsReducer)
  const userData = useSelector((state)=> state.userReducer)
  

  useEffect(() => {
    !isEmpty(salonsData[0]) && setIsLoading(false)
  }, [salonsData])


  return (
    <div key={salonProps._id}>
      {isLoading ? (
        <i className='fas-fa-spinner fa-spin'></i>
      ) : (
        <>
          <div className='flex flex-col'>
            
            <img src={!isEmpty(salonsData[0]) &&
              salonsData
              .map((salon) => {
                if (salon._id) return salon.picture
                else return null
              })} 
            />

            <h3>
              {isEmpty(salonsData[0]) &&
              salonsData
              .map((salon) => {
                if (salon._id) return salon.name 
                else return null
              })
              .join("")}
            </h3>

          </div>
        </>
      )}
      {
        userData._id === salon.ownerId && (
          <DeleteCard id={salonProps.id}/>
        )
      }
      
      <div className='card-footer'>
        <FavButton favProps={salonProps}/>
      </div>
      
    </div>
  )
}

//Après deleteCard, mettre une moyenne des étoiles et le bouton fav
