const initialState = {
  user_id: 0,
  username: '',
  profile_img: '',
  is_admin: false
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}