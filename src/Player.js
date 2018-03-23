import React, { Component } from 'react'
import './Player.css'
import ChangeLifeTotalButton from './ChangeLifeTotalButton'
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
    this.persistLifeTotal = this.persistLifeTotal.bind(this)
  }

  modifyLifeTotal(step) {
    this.setState(
        (prevState) => ({ lifeTotal: prevState.lifeTotal + step, difference: prevState.difference + step }),
        this.persistLifeTotal
    )
    window.clearTimeout(this.differenceDebounce)
    this.differenceDebounce = window.setTimeout(() => {
        this.differenceElement.classList.add('fadeOut')
        window.setTimeout(() => {
            this.setState({ difference: 0 })
            this.differenceElement.classList.remove('fadeout')
        }, 500)
    }, 2000)
  }

  persistLifeTotal() { localStorage.setItem(this.state.number, this.state.lifeTotal) }

  increaseLifeTotal() { this.modifyLifeTotal(1) }

  decreaseLifeTotal() { this.modifyLifeTotal(-1) }

  reset() { this.setState({ lifeTotal: 20 }, this.persistLifeTotal) }

  resetOnDoubleTap(event) { return isDblTouchTap(event) ? this.reset() : {} }

  render() {
    return (
      <div className={`Player ${this.props.layout === 'reversed' ? 'reversed' : ''}`}>
        <div
          ref={i => this.differenceElement = i}
          className={`lifeChangeEventBubble
            ${this.state.difference !== 0 ? 'show' : 'hide'}
            ${this.state.difference < 0 ? 'negative' : 'positive'}`}>
              {this.state.difference > 0 ? '+' : ''}{this.state.difference}
        </div>
        <ChangeLifeTotalButton handler={this.decreaseLifeTotal} label="-"/>
        <div className="lifeDisplay" onTouchTap={this.resetOnDoubleTap}>{this.state.lifeTotal}</div>
        <ChangeLifeTotalButton handler={this.increaseLifeTotal} label="+"/>
      </div>
    )
  }
}

export default Player
