var React = require('react');
	Rebus = require('../utils/Rebus.js');

var TodoApp = React.createClass({
	render : function(){
		var TodoHead = Rebus.do('GET_TODOHEAD'),
			TodoBody = Rebus.do('GET_TODOBODY'),
			TodoFoot = Rebus.do('GET_TODOFOOT');
		return (
			<div>
				{TodoHead}
				{TodoBody}
				{TodoFoot}
			</div>
		);
	},//End render
});

module.exports = TodoApp;