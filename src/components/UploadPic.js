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
      resultGif: '',
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
    const times = 12;
    const images = [];
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        images.push(this.webcam.getScreenshot());
        this.setState({
          imageArr: images,
          showSome: true,
          showOne: false,
        });
      }, 320 * i);
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
        .catch(err => console.log(err));
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

  async uploadSome() {
    if (this.state.showSome) {
      const { imageArr } = this.state;
      const data = {
        imageArr,
      };
      const res = await oAxios.post('/create_gif', data)
        .then(response => response.data)
        .catch(err => console.log(err));
      if (res) {
        if (res.code === 0) {
          const { resultGif } = res;
          this.setState({
            resultGif,
          });
        } else {
          alert(res.msg);
        }
      } else {
        alert('计算失败，建议重新尝试！');
      }
    }
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
            className="btn"
            onClick={this.captureOne}
          >
            拍照
          </Button>
          <Button
            title="连拍生成gif动图"
            className="btn"
            onClick={this.captureSome}
          >
            连拍
          </Button>
          <br />
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
            className="result-btn-left"
            onClick={this.uploadOne}
          >
            是否上传
          </Button>
          <Button
            className="result-btn-right"
            onClick={this.downloadOne}
          >
            点击下载
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
            className="result-btn-left"
            onClick={this.uploadSome}
          >
            是否上传
          </Button>
          <Button
            className="result-btn-right"
            onClick={this.downloadSome}
          >
            点击下载
          </Button>
        </div>
        <div
          className="show-result-img"
        >
          <img src={this.state.resultImg} alt="" />
        </div>
        <div
          className="show-result-gif"
        >
          <img src={this.state.resultGif} alt="" />
        </div>
      </div>
    );
  }
}
