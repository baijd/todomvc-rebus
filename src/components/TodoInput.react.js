var React = require('react'),
	Rebus = require('../utils/Rebus.js');

var _FILE = 'TodoInput.react.js',
	ENTER_KEY_CODE = 13;

module.exports = React.createClass({

	getInitialState : function(){
		return {
			value : this.props.value || '',
			onSave: this.props.onSave || this.onSave,
		};
	},

	render : function(){
		return (
			<input
				className={this.props.className}
				id='new-todo'
				placeholder={this.props.placeholder}
				autoFocus={true}
				value={this.state.value}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown} />
		);
	},

	onChange : function(event){
		this.setState({
			value : event.target.value
		});
	},

	onKeyDown : function(event){
		if(ENTER_KEY_CODE === event.keyCode){
			this.state.onSave(this.state.value);
		}
	},

	onSave : function(text){
		var actionHead = {akey:'ADD_TODO',from:_FILE};
		Rebus.execute(actionHead, {text:text});
		this.setState({value : ''});
	},

});