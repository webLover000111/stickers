import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { Upload, Button, Icon } from 'antd';
import oAxios from '../config/Axios';

export default class UploadPic extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.captureOne = this.captureOne.bind(this);
    this.captureSome = this.captureSome.bind(this);
    this.uploadOne = this.uploadOne.bind(this);
    this.uploadSome = this.uploadSome.bind(this);
    this.state = {
      imageArr: [],
      imageOne: '',
      showOne: false,
      showSome: false,
      resultImg: '',
    };
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  captureOne() {
    const imageOne = this.webcam.getScreenshot();
    this.setState({
      imageOne,
      showOne: true,
      showSome: false,
    });
  }

  captureSome() {
    const times = 16;
    const images = [];
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        images.push(this.webcam.getScreenshot());
        this.setState({
          imageArr: images,
          showSome: true,
          showOne: false,
        });
      }, 300 * i);
    }
  }

  async uploadOne() {
    if (this.state.showOne) {
      const { imageOne } = this.state;
      const data = {
        imageOne,
      };
      const res = await oAxios.post('/create_img', data)
        .then(res => res.data)
        .catche(err => console.log(err));
      if (res) {
        if (res.code === 0) {
          const { resultImg } = res;
          this.setState({
            resultImg,
          });
        } else {
          alert(res.msg);
        }
      } else {
        alert('计算失败，建议重新尝试！');
      }
    }
  }

  uploadSome() {

  }

  render() {
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      multiple: true,
      defaultFileList: '',
    };
    const images = this.state.imageArr.map((item, index) => (
      <img src={item} key={index.toString()} alt="" />
    ));
    return (
      <div className="uploadPic">
        <Upload
          className="upload"
          {...props}
        >
          <Button>
            <Icon type="upload" /> 本地上传
          </Button>
        </Upload>
        <div className="photo">
          <Button
            title="生成加了贴图的图片"
            onClick={this.captureOne}
          >
            拍照
          </Button>
          <Button
            title="连拍生成gif动图"
            onClick={this.captureSome}
          >
            连拍
          </Button>
          <Webcam
            audio={false}
            height={300}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={400}
          />
        </div>
        <div
          className={
            this.state.showOne
            ? 'show-one-pic'
            : 'hide'
          }
        >
          <img src={this.state.imageOne} alt="" />
          <br />
          <Button
            onClick={this.uploadOne}
          >
            上传？
          </Button>
        </div>
        <div
          className={
            this.state.showSome
            ? 'show-some-pic'
            : 'hide'
          }
        >
          {images}
          <br />
          <Button
            onClick={this.uploadSome}
          >
            上传？
          </Button>
        </div>
        <div
          className="show-result"
        >
          <img src={this.state.resultImg} alt="" />
        </div>
      </div>
    );
  }
}
