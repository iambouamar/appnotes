import React from 'react';

class Form extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.props.handleChange(event);
    }
  
    handleSubmit(event) {
        this.props.handleSubmit(event);
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s3">
              <input name="currentTitle" type="text" value={this.props.currentTitle} onChange={this.handleChange} />
            </div>
            <div className="input-field col s7">
              <input type="text" name="currentDetails" value={this.props.currentDetails} onChange={this.handleChange} />
            </div>
            <div className="input-field col s2">
              <button className="btn-large waves-effect waves-light" type="submit" name="action">
                Add note
              </button>
            </div>
          </div>
           
        </form>
      );
    }  
  }

  export default Form; 