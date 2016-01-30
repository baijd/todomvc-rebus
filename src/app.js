var ReactDOM = require('react-dom'),
	Rebus = require('./utils/Rebus.js'),
	stateTree = require('./store/stateTree.js');

// 1. init stateTree
Rebus.initState(stateTree);

// 2. init action routing table by require 'rebus.route.js'
require('./rebus.route.js');

// 3. init the config of Rebus.js
Rebus.initConfig({
	showListener : false,
	showAction: false,
});

// 4. create the root component by Rebus.
var app = Rebus.execute({akey:'GET_TODOAPP',from:'app.js'});
ReactDOM.render(
	app,
	document.getElementById('todoapp')
	);

//打印整棵状态树
// Rebus.printStateTree();

//打印某个状态的值
// Rebus.printStateTree('filter');

//打印所有state的监听者
// Rebus.printStateListener();

//打印某个state的监听者
// Rebus.printStateListener('todos');
