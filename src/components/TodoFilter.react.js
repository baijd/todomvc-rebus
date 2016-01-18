var React = require('react'),
	Rebus = require('../utils/Rebus.js'),
	classNames = require('classnames'),
	Contants = require('../utils/Contants.js');

//组件ID
var _compID = Contants.TODO_FILTER;

//组件状态生成函数
var _createState = function(){
	return {
		filter : Rebus.do('GET_FILTER'),
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
		Rebus.addStoreListener(['filter'], function(){
			this.setState(_createState);
		}.bind(this));
	},
	componentWillUnmount : function(){
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
		Rebus.do('UPDATE_FILTER', filter);
	},
	
});