var Rebus = require('../utils/Rebus.js');

module.exports = {
	logAddTodo : function(){
		console.log('You have added a new Todo item: '+arguments[1].text);
	}
}