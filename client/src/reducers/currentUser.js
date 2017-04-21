export function currentUserFirstName(state = '', action){
  switch(action.type){
    case 'SET_CURRENT_USER_FIRSTNAME':
      return action.payload;
    case 'WIPE_CURRENT_USER_FIRSTNAME':
      return action.payload;
    default:
      return state;
  }
}


export function currentUserLastName(state = '', action){
  switch(action.type){
    case 'SET_CURRENT_USER_LASTNAME':
      return action.payload;
    case 'WIPE_CURRENT_USER_LASTNAME':
      return action.payload;
    default:
      return state;
  }
}

export function currentUserID(state = '', action){
  switch(action.type){
    case 'SET_CURRENT_USER_ID':
      return action.payload;
    default:
        return state;
  }
}
