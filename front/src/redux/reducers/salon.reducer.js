import { GET_SALON, UPDATE_SALON, DELETE_SALON, FAV_SALON, UNFAV_SALON, EDIT_COMMENT, DELETE_COMMENT } from "../actions/salons.action"
const initialState = {}

export default function salonReducer(state = initialState, action) {
  switch(action.type) {
    case GET_SALON:
      return action.payload
    case FAV_SALON:
      return state.map((salon) => {
        if (salon._id === action.payload.salonId)
          return {
            ...salon,
            favoriteBy: [ action.payload.userId, ...salon.favoriteBy]
          }
      })
    case UNFAV_SALON:
      return state.map((salon) => {
        if (salon._id === action.payload.salonId)
          return {
            ...salon,
            favoriteBy: salon.favoriteBy.filter((id) => id !== action.payload.userId)
          }
          return salon
      })
    case UPDATE_SALON:
      return state.map((salon) => {
        if (salon._id === action.payload.salonId) {
          return {
            ...salon,
            message: action.payload.message
          }
        } else return salon 
      })
    case DELETE_SALON:
      return state.filter((salon) => salon._id !== action.payload.salonId)
    case EDIT_COMMENT:
      return state.map((salon) => {
        if (salon._id === action.payload.id){
          return {
            ...salon,
            comment: salon.comment.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text 
                }
              } else {
                return comment
              }
            })
          }
        } else return comment
      })
      case DELETE_COMMENT:
        return state.map((comment) => {
          if (salon._id === action.payload.salonId) {
            return {
              ...comment,
              comments: salon.comment.filter((comment) => comment._id !== action.payload.commentId)
            }
          } else return salon
        })

      default: 
        return state
  }
}
