import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';

export default class UploadPic extends Component {
  constructor(props) {
    super(props);
    this.openCamera = this.openCamera.bind(this);
  }

  openCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d")
    if (navigator.mediaDevices.getUserMedia) {
      const p = navigator.mediaDevices.getUserMedia({
          video: { 
            width: { min:370, ideal: 700 },
          },
      });
      p.then(function (mediaStream) {
          const video = document.querySelector('video');
          video.src = window.URL.createObjectURL(mediaStream);
          video.onloadedmetadata = function (e) {
              // Do something with the video here.
              video.play();
          };
      });
      p.catch(function(err) { console.log(err.name); });
  } else if (navigator.mediaDevices.webkitGetUserMedia) {
      const p = navigator.mediaDevices.webkitGetUserMedia({
          video: true
      });
      p.then(function (mediaStream) {
          const video = document.querySelector('video');
          video.src = window.URL.createObjectURL(mediaStream);
          video.onloadedmetadata = function (e) {
              // Do something with the video here.
              video.play();
          };
      });
      p.catch(function(err) { console.log(err.name); });
  }
  }

  render() {
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      multiple: true,
      defaultFileList: '',
    };
    return (
      <div className="uploadPic">
        <Upload
          className="upload"
          {...props}
        >
          <Button>
            <Icon type="upload" /> upload
          </Button>
        </Upload>
        <div className="photo">
          <Button
            onClick={this.openCamera}
          >
          拍照
          </Button>
          <canvas id="canvas" />
          <video id="video" autoplay="" />
        </div>
      </div>
    );
  }
}
