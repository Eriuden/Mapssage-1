import React, { useContext, useEffect, useState} from 'react'
import { UidContext } from './appContext'
import { favSalon, unFavSalon } from '../redux/actions/salons.action'
import { useDispatch } from 'react-redux'


export default function FavButton({favProps}) {
    const [favorite, setFavorite] = useState(false)
    const uid = useContext(UidContext)
    const dispatch = useDispatch()

    const fav = () => {
        dispatch (favSalon(favProps._id, uid))
        setFavorite(true)
    }

    const unFav = () => {
        dispatch (unFavSalon(favProps._id, uid))
        setFavorite(false)
    }

    useEffect(() => {
        /* Si on trouve l'id de l'user dans les "followers" du salon,
        forcément on la passe en true !*/
        if(favProps.favoriteBy.includes(uid)) setFavorite(true)
        else setFavorite(false)
    }, [uid, favProps.favoriteBy, favorite ])

  return (
    <div>
        {      
        uid === null && (
            window.alert("vous devez être connecté pour ajouter à vos favoris")
        )}

        {
            uid && favorite === false && (
                <img src='../img/icons/heart.svg' onClick={fav} alt ="favorite"/>
            )
        }

        {
            uid && favorite && (
                <img src='../img/icons/heart-filled.svg' onClick={unFav} alt ="unfavorite"/>
            )
        }
        <span>{favProps.favoriteBy.length}</span>
    </div>
  )
}
