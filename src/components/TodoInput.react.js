var React = require('react'),
	ReactPropTypes = React.PropTypes,
	Rebus = require('../utils/Rebus.js');

var ENTER_KEY_CODE = 13;

var TodoInput = React.createClass({

	propTypes : {
		className : ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		value: ReactPropTypes.string
	},

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
				id={this.props.id}
				placeholder={this.props.placeholder}
				autoFocus={true}
				value={this.state.value}
				onChange={this.onChange}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown} />
		);
	},

	onChange : function(event){
		this.setState({
			value : event.target.value
		});
	},

	onBlur : function(){
		this.state.onSave(this.state.value);
	},

	onKeyDown : function(event){
		if(ENTER_KEY_CODE === event.keyCode){
			this.state.onSave(this.state.value);
		}
	},

	onSave : function(text){
		Rebus.do('ADD_TODO', {text:text});
		this.setState({value : ''});
	},
});

module.exports = TodoInput;