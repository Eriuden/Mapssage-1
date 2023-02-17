import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteSalon } from '../redux/actions/salons.action'

export default function DeleteCard({deleteProps}) {
  const dispatch = useDispatch()
  const deletSalon = () => dispatch(deleteSalon(deleteProps.id))
  return (
    <div onClick={()=> {
        if (window.confirm("Voulez vous supprimer votre salon ?")) {
            deletSalon()
        }
    }}>
        <img src='../img/icons/trash.svg' alt='fonction supprimer' />
    </div>
  )
}
