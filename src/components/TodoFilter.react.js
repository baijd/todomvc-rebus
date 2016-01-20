var React = require('react'),
	Rebus = require('../utils/Rebus.js'),
	classNames = require('classnames');

//组件FileName
var _FILE = 'TodoFilter.react.js';

//组件状态生成函数
var _createState = function(){
	return {
		filter : Rebus.execute({akey:'GET_FILTER',from:_FILE}),
	}
};

var _filters = {
	All		  : 0,
	Active 	  : 1,
	Completed : 2,
};

module.exports = React.createClass({
	getInitialState : function(){
		return _createState();
	},
	componentDidMount : function(){
		this.updateTodoFilter.hookey = 'updateTodoFilter';
		Rebus.addStoreListener(['filter'], this.updateTodoFilter);
	},
	componentWillUnmount : function(){
		Rebus.removeStoreListener(['filter'], this.updateTodoFilter);
	},
	render : function(){
		return (
			<ul id='filters'>
			{this.filterLinks()}	
			</ul>
		);
	},//End render
	filterLinks : function(id){
		var links = [];
		for(var key in _filters){
			var selected = (this.state.filter === _filters[key]);
			links.push(
				<li key={key}>
					<a href='#' 
						className={classNames({'selected':selected})}
						onClick={this.handleClick.bind(this,_filters[key])}>{key}</a>
				</li>
			);
		}
		return links;
	},//End filterLinks
	handleClick : function(filter){
		Rebus.execute({akey:'UPDATE_FILTER',from:_FILE}, filter);
	},
	updateTodoFilter : function(){
		this.setState(_createState);
	}
	
});