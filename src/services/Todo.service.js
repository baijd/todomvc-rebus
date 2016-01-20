var assign = require('object-assign'),
	Rebus = require('../utils/Rebus.js');

var _todos = Rebus.getStore('todos'),
	_filter = Rebus.getStore('filter');

function add(arg){
	var text = arg.text;
	if(text!==''){
		var id = (+new Date() + Math.floor(Math.random()*999999).toString(36));
		_todos[id] = {
			id		: id,
			complete: false,
			text 	: text
		};
	}
	Rebus.setStore('todos',_todos);//更新Store，触发监听该Store的组件刷新
}//End add

function remove(todoID){
	delete _todos[todoID];
	Rebus.setStore('todos',_todos);
};//End remove

function toggleComplete(todo){
	todo.complete = !todo.complete;
	_todos[todo.id] = todo;
	Rebus.setStore('todos',_todos);
};//End toggleComplete

function update(id, updates){
	_todos[id] = assign({}, _todos[id], updates);
	Rebus.setStore('todos',_todos);
}//End update

function getAllTodos(){
	return _todos;
}//End getAllTodos

function getTodosByFilter(){
	switch(_filter){
	case 0:
		return getAllTodos();
		break;
	case 1:
		return getLeftItems();
		break;
	case 2:
		return getCompleteds();
		break;
	default:
		break;
	}
}//End getTodosByFilter

function getCompleteds(){
	var completeds = {};
	for(var id in _todos){
		if(_todos[id].complete){
			completeds[id] = _todos[id];
		}
	}
	return completeds;
}//End getCompleteds

function getLeftItems(){
	var leftItems = {};
	for(var id in _todos){
		if(!_todos[id].complete){
			leftItems[id] = _todos[id];
		}
	}
	return leftItems;
}//End getLeftItems

function areAllComplete(){
	var propCount = 0;
	for(var id in _todos){
		propCount++;
		if(!_todos[id].complete){
			return false;
		}
	}
	if( 0===propCount )
		return false 
	else
		return true;
}//End areAllComplete

function toggleAllComplete(){
	var allCompleted = areAllComplete();
	for(var i in _todos){
		_todos[i].complete = !allCompleted;
	}
	Rebus.setStore('todos',_todos);
}//End toggleAllComplete

function clearCompleted(){
	for(var id in _todos){
		if(_todos[id].complete){
			delete _todos[id];
		}
	}
	Rebus.setStore('todos',_todos);
}//End clearCompleted

function getFilter(){
	return _filter;
}//End getFilter

function setFilter(filter){
	_filter = filter;
	Rebus.setStore('filter',_filter);
}//End setFilter

function logAddAction(){
	console.log('You have added a new Todo item: '+arguments[1].text);
}

module.exports = {
	add 		: add,
	remove 		: remove,
	getAllTodos : getAllTodos,
	update 		: update,
	areAllComplete 		: areAllComplete,
	toggleAllComplete 	: toggleAllComplete,
	toggleComplete 		: toggleComplete,
	clearCompleted		: clearCompleted,
	getTodosByFilter	: getTodosByFilter,
	getFilter 			: getFilter,
	setFilter			: setFilter,
	logAddAction		: logAddAction,
};