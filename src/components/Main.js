import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UploadPic from './UploadPic';

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <UploadPic />
      </div>
    );
  }
}
