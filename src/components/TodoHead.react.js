var React = require('react'),
	Rebus = require('../utils/Rebus.js');

var TodoHead = React.createClass({
	render : function(){
		var self = this;
		var props = {
				id:'new-todo',
				placeholder:'What needs to be done?',
			};
		var TodoInput = Rebus.do("GET_TODOINPUT", props);
		return (
			<header id="header">
				<h1>todos</h1>
				{TodoInput}
			</header>
		);
	},//End render

});

module.exports = TodoHead;