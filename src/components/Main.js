import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UploadPic from './UploadPic';

export default class Main extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="main">
        <UploadPic />
      </div>
    )
  }
}
