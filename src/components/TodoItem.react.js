var React = require('react'),
	ReactPropTypes = React.PropTypes,
	classNames = require('classnames'),
	Rebus = require('../utils/Rebus.js');

var _FILE = 'TodoItem.react.js';

var TodoItem = React.createClass({

	propTypes : {
		todo : ReactPropTypes.object.isRequired
	},

	getInitialState : function(){
		return {
			isEditing : false
		};
	},

	render : function(){

		var todo = this.props.todo;

		var input;
		if(this.state.isEditing){
			input = Rebus.execute({akey:'GET_TODOINPUT',from:_FILE}, 
				{className:'edit', onSave:this.onUpdate, value:todo.text} );
		}

		return (
			<li className={classNames({
					'completed':todo.complete,
					'editing':this.state.isEditing
				})}
				key={todo.id} >

				<div className='view'>

					<input className='toggle'
						type='checkbox'
						checked={todo.complete}
						onChange={this.onToggleComplete} />

					<label onDoubleClick={this.onDoubleClick}>
						{todo.text}
					</label>

					<button className='destroy' onClick={this.onDestroyClick} />

				</div>

				{input}

			</li>
		);
	},//End render()

	onToggleComplete : function(){
		Rebus.execute({akey:'TOGGLE_COMPLETE',from:_FILE}, this.props.todo);
	},//End onToggleComplete()

	onDoubleClick : function(event){
		this.setState({isEditing:true});
	},//End onDoubleClick()

	onDestroyClick : function(){
		Rebus.execute({akey:'DESTROY_TODO',from:_FILE}, this.props.todo.id);
	},//End _onDestoryClick()

	onUpdate : function(text){
		if(text.trim()!=''){
			Rebus.execute({akey:'UPDATE_TODO',from:_FILE},this.props.todo.id, {text:text});
		}
		this.setState({isEditing:false});
	},//End onUpdate()

});

module.exports = TodoItem;