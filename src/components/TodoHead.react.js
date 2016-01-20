var React = require('react'),
	Rebus = require('../utils/Rebus.js');

var _FILE = 'TodoHead.react.js';

var TodoHead = React.createClass({
	render : function(){
		var self = this;
		var props = {
				id:'new-todo',
				placeholder:'What needs to be done?',
			};
		var TodoInput = Rebus.execute({akey:"GET_TODOINPUT",from:_FILE}, props);
		return (
			<header id="header">
				<h1>todos</h1>
				{TodoInput}
			</header>
		);
	},//End render

});

module.exports = TodoHead;