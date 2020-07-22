import { isLoading, hasErrored, setQuestions } from '../actions'

export const getQuestions = (round, questionCat, difficulty) => {
  const url = `https://opentdb.com/api.php?amount=5&category=${questionCat}&difficulty=${difficulty}&type=multiple`
  
  return async (dispatch) =>  {
    try {
      dispatch(isLoading(true))
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      const data = await response.json()
      console.log('round', round)
      dispatch(isLoading(false))
      dispatch(setQuestions({[round]: data.results }))
    } catch (error) {
      dispatch(hasErrored(error.message))
    }
  }
}