import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={createStore(() => {})}>
      <App
        initiativeList={[]}
        addInitiative={() => {}}
        nextTurn={() => {}} />
    </Provider>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})
