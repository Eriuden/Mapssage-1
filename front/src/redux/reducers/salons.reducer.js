import { GET_SALONS } from "../actions/salons.action"
const initialState = {}

export default function salonsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_SALONS:
      return action.payload
    default: 
      return state
  }
}
