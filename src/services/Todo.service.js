var assign = require('object-assign'),
	Rebus = require('../utils/Rebus.js');

//AOP(切面编程)
function updateTodos(operate){
	var todos = Rebus.getState('todos');
	operate(todos);
	Rebus.setState('todos',todos);
}

function add(arg){
	updateTodos(function(todos){
		var text = arg.text;
		if(text!==''){
			var id = (+new Date() + Math.floor(Math.random()*999999).toString(36));
			todos[id] = {
				id		: id,
				complete: false,
				text 	: text
			};
		}
	});//End updateTodos
}//End add

function remove(todoID){
	updateTodos(function(todos){
		delete todos[todoID];
	});
};//End remove

function toggleComplete(todo){
	updateTodos(function(todos){
		todo.complete = !todo.complete;
		todos[todo.id] = todo;
	});
};//End toggleComplete

function update(id, updates){
	updateTodos(function(todos){
		todos[id] = assign({}, todos[id], updates);
	});
}//End update

function clearCompleted(){
	updateTodos(function(todos){
		for(var id in todos){
			if(todos[id].complete){
				delete todos[id];
			}
		}
		setFilter(0);
	});
}//End clearCompleted

function getAllTodos(){
	return Rebus.getState('todos');
}//End getAllTodos

function getTodosByFilter(){
	switch(Rebus.getState('filter')){
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
	var todos = Rebus.getState('todos');
	for(var id in todos){
		if(todos[id].complete){
			completeds[id] = todos[id];
		}
	}
	return completeds;
}//End getCompleteds

function getLeftItems(){
	var leftItems = {};
	var todos = Rebus.getState('todos');
	for(var id in todos){
		if(!todos[id].complete){
			leftItems[id] = todos[id];
		}
	}
	return leftItems;
}//End getLeftItems

function areAllComplete(){
	var propCount = 0;
	var todos = Rebus.getState('todos');
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
	var todos = Rebus.getState('todos');
	for(var i in todos){
		todos[i].complete = !allCompleted;
	}
	Rebus.setState('todos',todos);
}//End toggleAllComplete

function getFilter(){
	return Rebus.getState('filter');
}//End getFilter

function setFilter(filter){
	Rebus.setState('filter',filter);
}//End setFilter

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
};