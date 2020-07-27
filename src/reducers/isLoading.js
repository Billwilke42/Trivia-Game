const initialState = false

export const isLoading = (state = initialState, action) => {
  switch(action.type) {
    case 'IS_LOADING':
      return action.isLoading
    default:
      return state
  }
}