import React, { Component } from 'react'
import './App.css'
import Player from './Player'

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.players = []
    this.registerPlayer = this.registerPlayer.bind(this)
  }

  registerPlayer(player) { this.players = this.players.concat(player) }

  render() {
    return (
      <div className="App">
        <Player layout="reversed" ref={this.registerPlayer} number="1" startingLifeTotal="20"/>
        <div className="eventLog"/>
        <Player ref={this.registerPlayer} number="2" startingLifeTotal="20"/>
      </div>
    )
  }
}

export default App;
