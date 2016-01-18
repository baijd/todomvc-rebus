var Rebus = require('./utils/Rebus.js'),
	CompFactory = require('./services/Comp.factory.js'),
	TodoService = require('./services/Todo.service.js'),
	Contants = require('./utils/Contants.js');

Rebus.connect('GET_TODOAPP', CompFactory.createTodoApp);

Rebus.connect('GET_TODOHEAD', CompFactory.createTodoHead);

Rebus.connect('GET_TODOINPUT', CompFactory.createTodoInput);

Rebus.connect('GET_TODOBODY', CompFactory.createTodoBody);

Rebus.connect('GET_TODOITEM', CompFactory.createTodoItem);

Rebus.connect('GET_TODOFOOT', CompFactory.createTodoFoot);

Rebus.connect('GET_TODOFILTER', CompFactory.createTodoFilter);

Rebus.connect('ARE_ALL_COMPLETE', TodoService.areAllComplete);

Rebus.connect('GET_ALL_TODOS', TodoService.getAllTodos);

Rebus.connect('GET_TODOS', TodoService.getTodosByFilter);

Rebus.connect('GET_FILTER', TodoService.getFilter);

Rebus.connect('ADD_TODO', TodoService.add).and([TodoService.log]);

Rebus.connect('DESTROY_TODO', TodoService.remove);

Rebus.connect('UPDATE_TODO', TodoService.update).and([TodoService.log]);

Rebus.connect('TOGGLE_COMPLETE', TodoService.toggleComplete);

Rebus.connect('TOGGLE_ALL_COMPLETE', TodoService.toggleAllComplete);
	
Rebus.connect('CLEAR_COMPLETED', TodoService.clearCompleted);

Rebus.connect('UPDATE_FILTER', TodoService.setFilter);







