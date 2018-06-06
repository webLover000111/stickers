import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { /* Upload, */ Button, /* Icon, */ Spin } from 'antd';
import oAxios from '../config/Axios';

export default class UploadPic extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
    this.captureOne = this.captureOne.bind(this);
    this.captureSome = this.captureSome.bind(this);
    this.uploadOne = this.uploadOne.bind(this);
    this.uploadSome = this.uploadSome.bind(this);
    this.localUpload = this.localUpload.bind(this);
    this.handleLocalUploadChange = this.handleLocalUploadChange.bind(this);
    this.handleLocalUploadRemove = this.handleLocalUploadRemove.bind(this);
    this.localUploadStatus = this.localUploadStatus.bind(this);

    this.state = {
      imageArr: [],
      imageOne: '',
      showOne: false,
      showSome: false,
      resultImg: '',
      resultGif: '',
      /* localUploadStatus: false, */
      hasResult: false,
      showBtn: false,
      downloadStatus: true, // 不能点击
      uploadStatus: false, // 可点击
      otherBtnStatus: false,
      star: '',
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
      showBtn: true,
      uploadStatus: false,
      downloadStatus: true,
    });
  }

  captureSome() {
    const times = 24;
    const images = [];
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        images.push(this.webcam.getScreenshot());
        this.setState({
          imageArr: images,
          showSome: true,
          showOne: false,
          showBtn: true,
          uploadStatus: false,
          downloadStatus: true,
        });
      }, 320 * i);
    }
  }

  async uploadOne() {
    if (this.state.showOne) {
      const { imageOne } = this.state;
      this.setState({
        hasResult: true,
        showOne: false,
        uploadStatus: true,
        otherBtnStatus: true,
      });
      const data = {
        imageOne,
      };
      const res = await oAxios.post('/create_img', data)
        .then(response => response.data)
        .catch(err => console.log(err));
      if (res) {
        if (res.code === 0) {
          const { resultImg, star } = res;
          this.setState({
            resultImg,
            hasResult: false,
            downloadStatus: false,
            otherBtnStatus: false,
            star,
          });
        } else if (res.code === 401) {
          alert(res.msg);
          window.location.hash = '/login';
        } else {
          alert(res.msg);
        }
      } else {
        alert('计算失败，建议重新尝试！');
        this.setState({
          hasResult: false,
          otherBtnStatus: false,
          uploadStatus: false,
          showOne: true,
        });
      }
    }
  }

  async uploadSome() {
    if (this.state.showSome) {
      const { imageArr } = this.state;
      this.setState({
        hasResult: true,
        showSome: false,
        uploadStatus: true,
        otherBtnStatus: true,
      });
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
            hasResult: false,
            downloadStatus: false,
            otherBtnStatus: false,
          });
        } else if (res.code === 401) {
          alert(res.msg);
          window.location.hash = '/login';
        } else {
          alert(res.msg);
        }
      } else {
        alert('计算失败，建议重新尝试！');
        this.setState({
          hasResult: false,
          otherBtnStatus: false,
          uploadStatus: false,
          showSome: true,
        });
      }
    }
  }

  localUpload() {

  }

  handleLocalUploadChange() {

  }

  handleLocalUploadRemove() {

  }

  localUploadStatus() {

  }
  render() {
    /* const props = {
      action: '',
      listType: 'picture',
      multiple: false,
      defaultFileList: '',
      accept: 'image/jpg',
      withCredentials: true,
      customRequest: this.localUpload,
      onChange: this.handleLocalUploadChange,
      onRemove: this.handleLocalUploadRemove,
      disabled: this.state.localUploadStatus,
    }; */
    const images = this.state.imageArr.map((item, index) => (
      <img src={item} key={index.toString()} alt="" />
    ));
    return (
      <div className="uploadPic">
        {/* <Upload
          className="upload"
          {...props}
        >
          <Button
            title="只能上传一张图片"
            disabled={this.state.otherBtnStatus}
          >
            <Icon type="upload" /> 本地上传
          </Button>
        </Upload> */}
        <div className="photo">
          <Button
            title="生成加了贴图的图片"
            className="btn"
            onClick={this.captureOne}
            disabled={this.state.otherBtnStatus}
          >
            拍照
          </Button>
          <Button
            title="连拍生成gif动图"
            className="btn"
            onClick={this.captureSome}
            disabled={this.state.otherBtnStatus}
          >
            连拍
          </Button>
          <br />
          <Webcam
            audio={false}
            height={300}
            width={400}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
          />
        </div>
        <div
          className={
            this.state.showBtn
            ? 'upload-download-btn'
            : 'hide'
          }
        >
          <Button
            className="result-btn-left"
            disabled={this.state.uploadStatus}
            onClick={
              this.state.showSome
              ? this.uploadSome
              : this.uploadOne
            }
          >
            是否上传
          </Button>
          <Button
            className="result-btn-right"
            disabled={this.state.downloadStatus}
            onClick={
              this.state.showSome
              ? this.downloadSome
              : this.downloadOne
            }
          >
            点击下载
          </Button>
        </div>

        <div
          className={
              this.state.hasResult
              ? 'loading-container'
              : 'hide'
          }
        >
          <Spin
            tip="疯狂计算中..."
            className="spin"
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
        </div>

        <div
          className={
            this.state.showSome
            ? 'show-some-pic'
            : 'hide'
          }
        >
          {images}
        </div>

        <div
          className={
            this.state.downloadStatus
            ? 'hide'
            : 'show-result-img'
          }
        >
          <img src={this.state.star} alt="" className="star" />
          <img src={this.state.resultImg} alt="" className="result-img" />
        </div>
        <div
          className={
            this.state.downloadStatus
            ? 'hide'
            : 'show-result-gif'
          }
        >
          <img src={this.state.resultGif} alt="" />
        </div>
      </div>
    );
  }
}
