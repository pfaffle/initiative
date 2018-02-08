const ADD_INITIATIVE = 'ADD_INITIATIVE'

export const addInitiative = character => ({
  type: ADD_INITIATIVE,
  character
})

export default function reducer (state = [], action = {}) {
  switch (action.type) {
    case ADD_INITIATIVE:
      return state.concat(action.character)
    default:
      return state
  }
}
