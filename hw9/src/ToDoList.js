import React from "react";

class ToDoList extends React.Component { 
  constructor(props) { 
    super(props); 
    this.state = { 
      value: '', 
      itemList: [], 
    }; 
    this.handleChange = this.handleChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  } 
  handleChange(event) { 
    this.setState({value: event.target.value}); 
  } 
  handleSubmit(event) { 
    this.state.itemList.push(this.state.value); 
    this.setState({value: '', itemList: this.state.itemList,}); 
    event.preventDefault(); 
  } 
  render()
  {
    return (
      <div> 
      <form onSubmit={this.handleSubmit}> 
        <label> 
        &emsp;&emsp;CGU ToDoList&#xFF1A;
        &ensp;
          <input type="text" value={this.state.value} onChange={this.handleChange} /> 
        </label> 
        &ensp;
        <input type="submit" value="&#x65B0;&#x589E;" />
      </form> 
      <ul style={{ textAlign: 'left'}}>
        {this.state.itemList.map((item, index) => <li id={index} key={`item_${index}`}>
        {<div id={index}>
        {<div class="Left_Button"><button onClick={() => {var obj = document.getElementById(index);obj.innerHTML = item.strike();}}>&#x505A;&#x5B8C;</button></div>}
        {<div class="Item">{item}</div>}
        {<div class="Right_Button"><button onClick={() => {var obj = document.getElementById(index);obj.parentNode.removeChild(obj);}}>&#x522A;&#x9664;</button></div>}
        </div>}
        </li>)}
      </ul> 
      </div> 
    ); 
  }
}

export default ToDoList;