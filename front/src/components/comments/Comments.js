import React, { useState} from 'react'
import { addComment, getSalons } from '../../redux/actions/salons.action'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import EditDeleteComment from './editDeleteComment'
import { isEmpty } from '../../utils'

export default function Comments({commentProps}) {
  const [text, setText] = useState("")
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer) 
  const dispatch = useDispatch()

  const handleComment = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addComment(commentProps._id, userData._id, text, userData.name))
        .then(()=> dispatch(getSalons()))
        .then(()=> setText(""))
    }
  }
// Note à moi même, l'idée de nommer les props commentProps peut porter à confusion
  return (
    <div>
      {commentProps.comments.map((comment)=> {
        return(
          <div key={comment._id}>
            <div>
              <img src={!isEmpty(usersData[0]) &&
              usersData.map((user)=> {
                if(user._id === comment.commenterId) return user.picture
                else return null
              })
            .join("")
            }
            />
            </div>

            <div>
              <h3>{comment.commenterName}</h3>
            </div>
            <p>{comment.text}</p>
            <EditDeleteComment editdelcomProps={comment} salonId = {commentProps._id}/>
          </div>  
        )
      })}

{
        /*
        Le formulaire qui permet d'envoyer le commentaire
        Oubli rectifié, un autre intérêt de la veille et de l'autocorrection ^^
        */
        userData._id && (
          <form action="" onSubmit={{ handleComment }}>
            <input
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="laisser un commentaire"
            />
            <br />
            <input type="submit" value="Envoyer" />
          </form>
        )
      }
    </div>
  )
}
