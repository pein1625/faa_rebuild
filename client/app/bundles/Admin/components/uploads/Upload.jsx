import React from 'react';

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDeleteImage = this.handleDeleteImage.bind(this);
  }

  handleFileChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const that = this;

    reader.onloadend = function() {
      that.props.fileChangeHandle(reader.result, that.props.index);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({url: ""});
    }
  }

  handleDeleteImage() {
    this.props.handleDeleteImage(this.props.index);
  }

  render() {
    return (
      <div className="row upload-item" style={{paddingBottom: 20}}>
        <div className="col-md-4">
          <input type="file" ref="image_attributes_url" name="image_attributes_url"
            onChange={this.handleFileChange}></input>
          <a className="btn btn-sm btn-danger" onClick={this.handleDeleteImage} style={{marginTop: 15}}>
            <i className="fa fa-times"></i>
          </a>
        </div>
        <div className="col-md-6">
          <img className="preview-image" src={this.props.url}/>
        </div>
      </div>
    )
  }
}

export default Upload;
