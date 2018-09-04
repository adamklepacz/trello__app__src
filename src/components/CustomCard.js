import React, {Component} from 'react';
import * as moment from 'moment';

class CustomCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dueOn: this.props.dueOn,
      today: this.props.today,
      isThreeDaysToDue: '',
      isTaskOverdue: ''
    };

    this.checkCardDueDate = this.checkCardDueDate.bind(this);
  }

  checkCardDueDate() {
    const isThreeDaysToDue = moment(this.state.dueOn).subtract(3, 'days').isSameOrBefore(moment());
    const isTaskOverdue = moment(this.state.dueOn).isBefore(moment());

    this.setState({
      isThreeDaysToDue: isThreeDaysToDue,
      isTaskOverdue: isTaskOverdue
    }, () => {
      this.render();
    });
  }

  componentDidMount() {
    this.checkCardDueDate();
  }

  render() {
    const {isTaskOverdue, isThreeDaysToDue} = this.state;

    return (
      <div className={(isTaskOverdue ? 'red-card ' : '') + (isThreeDaysToDue ? 'yellow-card' : '')}>
        <header
          style={{
            borderBottom: '1px solid #eee',
            padding: 5,
            marginBottom: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <div style={{fontSize: 14, fontWeight: 'bold'}}>{this.props.name}</div>
          <div style={{fontSize: 11}}>{this.props.dueOn}</div>
        </header>
        <div style={{fontSize: 12, color: '#BD3B36'}}>
          <div style={{padding: '5px'}}>
            <i>{this.props.body}</i>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomCard;