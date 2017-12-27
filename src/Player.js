import React, { Component } from 'react'
import './Player.css'
import ChangeLifeTotalButton from './ChangeLifeTotalButton'
import * as L from 'partial.lenses'

class Player extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      number: props.number,
      lifeTotal: parseInt(props.startingLifeTotal, 10)
    }
    this.increaseLifeTotal = this.increaseLifeTotal.bind(this)
    this.decreaseLifeTotal = this.decreaseLifeTotal.bind(this)
    this.reset = this.reset.bind(this)
    this.modifyLifeTotal = this.modifyLifeTotal.bind(this)
  }

  modifyLifeTotal(fn) { this.setState(L.modify(['lifeTotal'], i => fn(i), this.state)) }

  increaseLifeTotal() { this.modifyLifeTotal(i => i + 1) }

  decreaseLifeTotal() { this.modifyLifeTotal(i => i === 0 ? 0 : i - 1) }

  reset() { this.modifyLifeTotal(() => 20) }

  render() {
    return (
      <div className={`Player ${this.props.layout === 'reversed' ? 'reversed' : ''}`}>
        <ChangeLifeTotalButton handler={this.increaseLifeTotal} label="+"/>
        <div className="lifeDisplay">{this.state.lifeTotal}</div>
        <ChangeLifeTotalButton handler={this.decreaseLifeTotal} label="-"/>
      </div>
    )
  }
}

export default Player
