import React, { useState, useEffect, useContext} from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, editComment } from '../../redux/actions/salons.action'
import { UidContext } from '../appContext'

export default function EditDeleteComment(editdelcomProps, salonId) {
  const [isAuthor, setIsAuthor] = useState(false)
  const [edit, setEdit] = useState(false)
  const [ text, setText] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(editComment(salonId, editdelcomProps._id, text))
      setText("")
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(salonId, editdelcomProps._id))
  }

  useEffect(()=> {
    const checkAuthor = () => {
      if (uid === editdelcomProps.commenterId) {
        setIsAuthor(true)
      }
    }
    checkAuthor()
  }, [uid, editdelcomProps._id])
  return (
    <div>
      {isAuthor && edit && (
        <span onClick={ setEdit(!edit)}>
          <img src="../img/icons/edit.svg" alt='edit' />
        </span>
      )}

      {isAuthor && edit && (
        <form action='' onSubmit={handleEdit}>
          <label htmlFor='text' onClick={()=> setEdit(!edit)}>
            Editer 
          </label>
          <br/>
          <input type="text" name='text' onChange={(e)=> setText(e.target.value)}
          defaultValue={ editdelcomProps.text} />
          <br/>
          <div>
            <span onClick={()=> {
              if (window.confirm("Voulez vous supprimer ce commentaire ?"))
                handleDelete()
            }}>
              <img src='../img/icons/trash.svg' alt='supprimer' />
            </span>
          </div>
          <input type="submit" value="Valider les modifications" />
        </form>
      )}

    </div>
  )
}
