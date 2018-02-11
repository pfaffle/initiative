const ADD_INITIATIVE = 'ADD_INITIATIVE'

export const addInitiative = character => ({
  type: ADD_INITIATIVE,
  character
})

// TODO consider modifier as a tiebreaker
const compareInitiativeDescending = function (a, b) {
  return b.initiative - a.initiative
}

// expects sorted array
const determineTurnOrder = (state) => {
  state[0].turn = true
  return state
}

// TODO add logic for when we're in combat vs. not, e.g. if we need to mark turn order & sort as we add
export default function reducer (state = [], action = {}) {
  switch (action.type) {
    case ADD_INITIATIVE:
      const newState = state.concat(action.character)
        .sort(compareInitiativeDescending)
        .map(character => ({
          ...character,
          turn: false
        }))
      return determineTurnOrder(newState)
    default:
      return state
  }
}
