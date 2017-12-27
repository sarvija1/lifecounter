import React, { Component } from 'react'
import './ChangeLifeTotalButton.css'

class ChangeLifeTotalButton extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      label: props.label
    }
  }

  render() {
    return (<button onClick={this.props.handler}>{this.state.label}</button>)
  }
}

export default ChangeLifeTotalButton
