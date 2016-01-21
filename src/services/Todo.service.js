var assign = require('object-assign'),
	Rebus = require('../utils/Rebus.js');

function add(arg){
	var todos = Rebus.getStore('todos');
	var text = arg.text;
	if(text!==''){
		var id = (+new Date() + Math.floor(Math.random()*999999).toString(36));
		todos[id] = {
			id		: id,
			complete: false,
			text 	: text
		};
	}
	Rebus.setStore('todos',todos);//更新Store，触发监听该Store的组件刷新
}//End add

function remove(todoID){
	var todos = Rebus.getStore('todos');
	delete todos[todoID];
	Rebus.setStore('todos',todos);
};//End remove

function toggleComplete(todo){
	var todos = Rebus.getStore('todos');
	todo.complete = !todo.complete;
	todos[todo.id] = todo;
	Rebus.setStore('todos',todos);
};//End toggleComplete

function update(id, updates){
	var todos = Rebus.getStore('todos');
	todos[id] = assign({}, todos[id], updates);
	Rebus.setStore('todos',todos);
}//End update

function getAllTodos(){
	return Rebus.getStore('todos');
}//End getAllTodos

function getTodosByFilter(){
	switch(Rebus.getStore('filter')){
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
	var todos = Rebus.getStore('todos');
	for(var id in todos){
		if(todos[id].complete){
			completeds[id] = todos[id];
		}
	}
	return completeds;
}//End getCompleteds

function getLeftItems(){
	var leftItems = {};
	var todos = Rebus.getStore('todos');
	for(var id in todos){
		if(!todos[id].complete){
			leftItems[id] = todos[id];
		}
	}
	return leftItems;
}//End getLeftItems

function areAllComplete(){
	var propCount = 0;
	var todos = Rebus.getStore('todos');
	for(var id in todos){
		propCount++;
		if(!todos[id].complete){
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
	var todos = Rebus.getStore('todos');
	for(var i in todos){
		todos[i].complete = !allCompleted;
	}
	Rebus.setStore('todos',todos);
}//End toggleAllComplete

function clearCompleted(){
	var todos = Rebus.getStore('todos');
	for(var id in todos){
		if(todos[id].complete){
			delete todos[id];
		}
	}
	Rebus.setStore('todos',todos);
}//End clearCompleted

function getFilter(){
	return Rebus.getStore('filter');
}//End getFilter

function setFilter(filter){
	Rebus.setStore('filter',filter);
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