import React, { Component } from 'react';
import todaysDate from '../utils/CurrentDate';


class NewCustomCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTaskOverdue: '',
      isThreeDaysToDue: '',
      today: todaysDate
    };

    this.handleAdd = this.handleAdd.bind(this);
  }

  updateField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleAdd = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state)
  }

  render() {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '5px',
        maxWidth: '250px'
      }}>
        <form onSubmit={this.handleAdd}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <input
              style={{
                borderRadius: '3px',
                marginRight: '5px',
                border: '1px solid gray'
              }}
              type="text" 
              placeholder="Title" 
              name="name" 
              required 
              onChange={(e) => {this.updateField(e)}}
            />
            <input
              style={{
                borderRadius: '3px',
                marginRight: '5px',
                border: '1px solid gray'
              }}
              type="date" 
              name="dueOn" 
              onChange={(e) => {this.updateField(e)}}
            />
          
          </div>
          
          <textarea 
            style={{
              width: '100%',
              borderRadius: '3px',
              marginRight: '5px',
              border: '1px solid gray',
              marginBottom: '8px',
              resize: 'vertical'
            }}
            type="text" 
            placeholder="Description" 
            name="body" 
            required 
            onChange={(e) => {this.updateField(e)}}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <button 
              style={{
                background: 'green',
                border: '0',
                borderRadius: '6px',
                padding: '5px 20px',
                color: 'white'
              }}
              type="submit"
            >Add</button>
            <button
              style={{
                background: 'red',
                border: '0',
                borderRadius: '6px',
                padding: '5px 20px',
                color: 'white'
              }}
            >Cancel</button>
          </div>
        </form>
      </div>
    )
  }

}

export default NewCustomCard;