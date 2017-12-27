import React, { Component } from 'react'
import './App.css'
import Player from './Player'

class App extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.players = []
    this.resetState = this.resetState.bind(this)
    this.registerPlayer = this.registerPlayer.bind(this)
  }

  resetState() { this.players.forEach(p => p.reset()) }

  registerPlayer(player) { this.players = this.players.concat(player) }

  render() {
    return (
      <div className="App">
        <button className="reset upper" onClick={this.resetState}>&#x2672;</button>
        <Player layout="reversed" ref={this.registerPlayer} number="1" startingLifeTotal="20"/>
        <div className="eventLog"/>
        <Player ref={this.registerPlayer} number="2" startingLifeTotal="20"/>
        <button className="reset lower" onClick={this.resetState}>&#x2672;</button>
      </div>
    )
  }
}

export default App;
