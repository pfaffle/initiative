import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App initiativeList={[]} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
