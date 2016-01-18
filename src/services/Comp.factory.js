var React = require('react'),
	contants = require('../utils/Contants.js'),
	TodoApp  = require('../components/TodoApp.react.js'),
	TodoHead = require('../components/TodoHead.react.js'),
	TodoInput = require('../components/TodoInput.react.js'),
	TodoBody = require('../components/TodoBody.react.js'),
	TodoItem = require('../components/TodoItem.react.js'),
	TodoFoot = require('../components/TodoFoot.react.js'),
	TodoFilter = require('../components/TodoFilter.react.js');

var CompFactory = {
	createTodoApp  : function(arg){
		return <TodoApp/>;
	},
	createTodoHead : function(arg){
		return <TodoHead/>;
	},
	createTodoInput : function(arg){
		return <TodoInput 
			id={arg.id}
			className={arg.className}
			placeholder={arg.placeholder}
			onSave={arg.onSave} />;
	},
	createTodoBody : function(arg){
		return <TodoBody/>;
	},
	createTodoItem : function(arg){
		return <TodoItem key={arg.key} todo={arg.todo} />;
	},
	createTodoFoot : function(arg){
		return <TodoFoot/>;
	},
	createTodoFilter: function(arg){
		return <TodoFilter/>;
	}
};

module.exports = CompFactory;