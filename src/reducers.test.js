import reducer, { addInitiative } from './reducers'

describe('reducer', () => {
  it('should have a default state', () => {
    expect(reducer()).toEqual([])
  })
  it('should add initiative for a new character', () => {
    const character = {
      name: 'Karis',
      initiative: 16
    }
    expect(reducer(undefined, addInitiative(character))).toEqual([character])
  })
})
