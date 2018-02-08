import React, { Component } from 'react'
import './Player.css'
import ChangeLifeTotalButton from './ChangeLifeTotalButton'
import * as L from 'partial.lenses'
import injectTapEventPlugin from "react-tap-event-plugin"
import isDblTouchTap from "./isDblTouchTap"

injectTapEventPlugin()

class Player extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      number: props.number,
      lifeTotal: parseInt(localStorage.getItem(props.number) || props.startingLifeTotal, 10),
      difference: 0
    }

    this.differenceDebounce = null

    this.increaseLifeTotal = this.increaseLifeTotal.bind(this)
    this.decreaseLifeTotal = this.decreaseLifeTotal.bind(this)
    this.reset = this.reset.bind(this)
    this.modifyLifeTotal = this.modifyLifeTotal.bind(this)
    this.resetOnDoubleTap = this.resetOnDoubleTap.bind(this)
  }

  modifyLifeTotal(fn, state = this.state) {
    this.setState(L.modify(['lifeTotal'], i => fn(i), state))
    localStorage.setItem(this.state.number, this.state.lifeTotal)
    window.clearTimeout(this.differenceDebounce)
    this.differenceDebounce = window.setTimeout(() => this.setState(L.modify(['difference'], () => 0, this.state)), 2000)
  }

  increaseLifeTotal() {
    this.modifyLifeTotal(i => i + 1, L.modify(['difference'], d => d + 1, this.state))
  }

  decreaseLifeTotal() {
    this.modifyLifeTotal(i => i === 0 ? 0 : i - 1, L.modify(['difference'], d => d - 1, this.state))
  }

  reset() { this.modifyLifeTotal(() => 20) }

  resetOnDoubleTap(event) { return isDblTouchTap(event) ? this.reset() : {} }

  render() {
    return (
      <div className={`Player ${this.props.layout === 'reversed' ? 'reversed' : ''}`}>
        <div className={`lifeChangeEventBubble ${this.state.difference !== 0 ? 'show' : ''}`}>{this.state.difference}</div>
        <ChangeLifeTotalButton handler={this.decreaseLifeTotal} label="-"/>
        <div className="lifeDisplay" onTouchTap={this.resetOnDoubleTap}>{this.state.lifeTotal}</div>
        <ChangeLifeTotalButton handler={this.increaseLifeTotal} label="+"/>
      </div>
    )
  }
}

export default Player
