var React = require('react');
	Rebus = require('../utils/Rebus.js');

//组件FileName
var _FILE = 'TodoApp.react.js';

var TodoApp = React.createClass({
	render : function(){
		var TodoHead = Rebus.execute({akey:'GET_TODOHEAD',from:_FILE}),
			TodoBody = Rebus.execute({akey:'GET_TODOBODY',from:_FILE}),
			TodoFoot = Rebus.execute({akey:'GET_TODOFOOT',from:_FILE});
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