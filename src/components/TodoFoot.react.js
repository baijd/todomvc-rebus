var React = require('react'),
	Rebus = require('../utils/Rebus.js');

//组件FileName
var _FILE = 'TodoFoot.react.js';

//组件状态生成函数
var _createState = function(){
	return {
		allTodos : Rebus.execute({akey:'GET_ALL_TODOS',from:_FILE}),
	};
};

var TodoFoot = React.createClass({
	getInitialState : function(){
		return _createState();
	},
	componentDidMount : function(){
		this.updateTodoFoot.hookey = 'updateTodoFoot';
		Rebus.addStoreListener(['todos'], this.updateTodoFoot);
	},
	componentWillUnmount : function(){
		Rebus.removeStoreListener(['todos'], this.updateTodoFoot);
	},
	render : function(){
		var allTodos = this.state.allTodos;
		var total = Object.keys(allTodos).length;

		if(0===total){
			return null;
		}

		var completed = 0;
		for(var key in allTodos){
			if(allTodos[key].complete){
				completed++;	
			}
		}

		var itemsLeft = total - completed;
		var itemsLeftPhrase = itemsLeft===1 ? ' item' : 'items';
		itemsLeftPhrase += ' left';	

		var clearCompletedButton;
		if(completed){
			clearCompletedButton = 
				<button id='clear-completed' onClick={this.onClearCompleteClick}>
					Clear completed ({completed})
				</button>;
		}

		var filterComp = Rebus.execute({akey:'GET_TODOFILTER_COMP',from:_FILE});
		return (
			<footer id='footer'>
				<span id='todo-count'>
					<strong>
						{itemsLeft}
					</strong>		
					{itemsLeftPhrase}
				</span>
				{filterComp}
				{clearCompletedButton}
			</footer>
		);
	},
	onClearCompleteClick : function(){
		Rebus.execute({akey:'CLEAR_COMPLETED',from:_FILE});
	},
	updateTodoFoot : function(){
		this.setState(_createState);
	},
});

module.exports = TodoFoot;