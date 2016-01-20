var React = require('react'),
	ReactPropTypes = React.PropTypes,
	Rebus = require('../utils/Rebus.js');

var _FILE = 'TodoInput.react.js',
	ENTER_KEY_CODE = 13;

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
		Rebus.execute({akey:'ADD_TODO',from:_FILE}, {text:text});
		this.setState({value : ''});
	},
});

module.exports = TodoInput;