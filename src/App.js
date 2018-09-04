import Board from 'react-trello';
import React, { Component } from 'react';
import CustomCard from './components/CustomCard';
import NewCustomCard from './components/NewCustomCard';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.setInitDataToLocalStorage();
    this.state = {
      data: this.getCurrentData(),
      laneTitle: '',
      //newCardId: newId(),
      currentlyDraggedCard: '',
      currentlyDraggedCardIndex: '',
      currentLaneIndex: '',
      currentLaneId: '',
      newTaskTitle: 'new task',
      newTaskDue: 'date',
      newTaskBody: 'descirpiton',
    };
    
    this.addCard = this.addCard.bind(this);
    this.addLane = this.addLane.bind(this);
    this.setInitDataToLocalStorage = this.setInitDataToLocalStorage.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleCardDrop = this.handleCardDrop.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.handleNewTaskData = this.handleNewTaskData.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  setInitDataToLocalStorage() {
    const data = {
      lanes: [
        {
          id: 'lane1',
          title: 'Custom trello backlog',
          cards: [
            {
              id: 'Card1',
              name: 'Develop a landing page',
              dueOn: '01-09-2018',
              body: 'Please develop a landing page of this app. A fancy one!',
              cardColor: '#BD3B36',
              cardStyle: {borderRadius: 6, marginBottom: 15}
            },
            {
              id: 'Card2',
              name: 'Develop a login page',
              dueOn: '23-09-2018',
              body: 'Login page InVision file is under this link: bit.ly! Have fun!',
              cardColor: '#E08521',
              cardStyle: {borderRadius: 6, marginBottom: 15}
            }
          ]
        }
      ]
    };


    localStorage.setItem('data', JSON.stringify(data));
  }

  getCurrentData() {
    const data = JSON.parse(localStorage.getItem('data'));

    return data;
  }

  updateData(data) {
    localStorage.setItem('data', JSON.stringify(data));

    this.setState({
      data: this.getCurrentData(),
    });
  }

  addCard(card, laneId) {

    const data = this.getCurrentData();
    const lanes = data.lanes;
    // this.setState({
    //   newCardId: newId(),
    // });
    
    lanes.map((current) => {
      const laneIndex = laneId.match(/\d/g).join('') - 1;
      
      //console.log(data, card);
      if(current.id === laneId) {
        
        data.lanes[laneIndex].cards.push(card);
      }

      this.updateData(data);
      
    });
    
  }

  removeCard(cardId, laneId) {
    // for future use...remove card here
  }

  moveCard(cardID, sourceLaneIdtargetLaneId, position, cardDetails) {
    const data = this.getCurrentData();
    const currentLaneIndex = sourceLaneIdtargetLaneId.match(/\d/g).join('') - 1;
    const nextLaneIndex = position.match(/\d/g).join('') - 1;

    // save current card to state
    data.lanes[currentLaneIndex].cards.map((currentCard, index) => {
      if(cardID === currentCard.id) {
        this.setState({
          currentlyDraggedCard: currentCard,
          currentlyDraggedCardIndex: index,
          currentLaneIndex: currentLaneIndex,
        });
      }
    });

   

    if (sourceLaneIdtargetLaneId !== position) {
      data.lanes[currentLaneIndex].cards.splice(this.state.currentlyDraggedCardIndex, 1);
      data.lanes[nextLaneIndex].cards.push(this.state.currentlyDraggedCard);
      
      this.updateData(data);
    }
  }

  addLane(e) {
    e.preventDefault();
    const data = this.getCurrentData();
    const nextItemIndex = data.lanes.length;
    const newLaneId = 'lane' + (nextItemIndex + 1);
    const newLaneTite = this.state.laneTitle.length > 0 ? this.state.laneTitle : 'New list';

    data.lanes[nextItemIndex] = {
      id: newLaneId,
      title: newLaneTite,
      cards: Array(0)
    };
    
    this.updateData(data);

    //reset form 
    this.setState({
      laneTitle: ''
    });
  }

  updateLaneTitle(e) {
    this.setState({
      laneTitle: e.target.value
    });
  }

  handleLaneClick(cardID, metadata, laneId) {
   // console.log(cardID, metadata, laneId);
  }

  handleLaneClick(laneId) {
    this.setState({
      currentLaneId: laneId,
    });
  }


  handleCardDrop(cardID, sourceLaneIdtargetLaneId, position, cardDetails) {
   // console.log(cardID, sourceLaneIdtargetLaneId, position, cardDetails);
  }

  handleNewTaskData(newTaskData) {
    console.log(newTaskData);
    const currentLaneId = this.state.currentLaneId;

    this.addCard(newTaskData, currentLaneId );
  }


  onAdd(data) {
    const newData = data;
  }

  render() {
    const data = this.state.data;
    const currentLaneId = this.state.currentLaneId;
   
    return (
      <div>
        <form 
          onSubmit={(e) => {this.addLane(e)}}
          style={{
            background: '#23719f',
            padding: '13px',
            display: 'flex',
            flexDirection: 'column' 
          }}
        >
          <input 
            type="text" 
            placeholder="Set new lane title" 
            value={this.state.laneTitle} 
            onChange={(e) => this.updateLaneTitle(e)}
            required
            style={{
              width: '200px',
              borderRadius: '6px',
              marginBottom: '8px',
              padding: '5px 10px'
            }}
          ></input>
          <button 
            type="submit"
            style={{
              width: '110px',
              background: 'green',
              color: 'white',
              padding: '5px 10px',
              border: '0',
              borderRadius: '6px'
            }}
          >Create new lane</button>


        </form>
        
        <Board 
          data={data}
          customCardLayout
          draggable 
          cardDraggable 
          editable 
          onCardAdd={(card, laneId) => this.addCard(card, laneId)}
          onCardClick={(cardID, metadata, laneId) => this.handleLaneClick(cardID, metadata, laneId) }
          handleDragEnd={(cardID, sourceLaneIdtargetLaneId, position, cardDetails) => this.moveCard(cardID, sourceLaneIdtargetLaneId, position, cardDetails)}
          handleDragStart = {(cardId, laneId)=> {this.removeCard(cardId, laneId)}}
          newCardTemplate={<NewCustomCard onAdd={this.onAdd}/>}
          onLaneClick={(laneId) => {this.handleLaneClick(laneId)}}
          //addCardLink={<AddNewTaskButton />}
        >

         
          <CustomCard lane={currentLaneId}/>

        
          
        </Board>

        
       
      </div>
      
    );
  }
}

export default App;
