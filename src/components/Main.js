import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Show from './Show';
import UploadPic from './UploadPic';

export default class Main extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <show />
        <UploadPic />
      </div>
    )
  }
}
