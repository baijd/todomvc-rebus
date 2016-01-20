var React = require('react'),
	ReactPropTypes = React.PropTypes,
	Rebus = require('../utils/Rebus.js');

//组件FileName
var _FILE = 'TodoBody.react.js';

//组件State生成器
var _createState = function(){
	return {
		todos : ( Rebus.execute({akey:'GET_TODOS',from:_FILE}) || {} ),
		areAllComplete : ( Rebus.execute({akey:'ARE_ALL_COMPLETE',from:_FILE}) || false ),
	}
}//End getTodoState

var TodoBody = React.createClass({

	getInitialState : function(){
		return _createState();
	},//End getInitialState

	componentDidMount : function(){
		this.updateTodoBody.hookey = 'updateTodoBody';
		Rebus.addStoreListener(['todos','filter'], this.updateTodoBody);
	},//End componentDidMount

	componentWillUnmount : function(){
		Rebus.removeStoreListener(['todos','filter'], this.updateTodoBody);
	},//End componentWillUnmount

	render : function(){
		var todos = this.state.todos,
			todoItems = [],
			actionHead= {akey:'GET_TODOITEM',from:_FILE};
		for(var key in todos){
			todoItems.push( Rebus.execute(actionHead,{key:key,todo:todos[key]}) );
		}
		return (
			<section id='main'>
				<input id='toggle-all' type='checkbox'
					onChange={this.onToggleCompleteAll}
					checked={this.state.areAllComplete ? 'checked' : ''} />
				<label htmlFor='toggle-all'>Mark all as complete</label>
				<ul id='todo-list'>{todoItems}</ul>
			</section>
		);
	},//End render

	onToggleCompleteAll : function(){
		Rebus.execute({akey:'TOGGLE_ALL_COMPLETE',from:_FILE});
	},//End onToggleCompleteAll

	updateTodoBody : function(){
		this.setState(_createState);
	},//End updateTodoBody

});

module.exports = TodoBody;