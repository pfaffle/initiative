import React, { Component } from 'react'
import logo from './img/d20.png'
import { Column, Table } from 'react-virtualized'
import Flexbox from 'flexbox-react'
import './App.css'
import 'react-virtualized/styles.css' // only needs to be imported once

class App extends Component {
  render () {
    const tableRows = [
      {turn: false, name: 'Karis', initiative: 16},
      {turn: true, name: 'Riku', initiative: 14}
    ]
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">D&D Initiative Tracker</h1>
        </header>
        <h2>Initiative Table</h2>
        <Flexbox justifyContent='center'>
          <Table
            width={300}
            height={300}
            headerHeight={20}
            rowHeight={20}
            rowCount={tableRows.length}
            rowGetter={({index}) => tableRows[index]}
          >
            <Column
              label='Turn'
              dataKey='turn'
              width={100}
              cellRenderer={({cellData}) => cellData ? '->' : ''}
            />
            <Column
              label='Name'
              dataKey='name'
              width={100}
            />
            <Column
              label='Initiative'
              dataKey='initiative'
              width={100}
            />
          </Table>
        </Flexbox>
        <button>Next</button>
      </div>
    )
  }
}

export default App
