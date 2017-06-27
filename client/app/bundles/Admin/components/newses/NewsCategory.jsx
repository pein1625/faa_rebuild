import React from 'react';

class NewsCategory extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }

  onChangeHandle(event) {
    this.props.handleChange(event.target.value);
  }

  render() {
    return (
      <div className="form-group">
        <select className="form-control" onChange={this.onChangeHandle} value={this.props.selected}>
          {
            this.props.categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
    );
  }
}

export default NewsCategory;
