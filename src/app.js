var ReactDOM = require('react-dom'),
	Rebus = require('./utils/Rebus.js'),
	store = require('./store/AppStore.js');

// 1. init store
Rebus.initStore(store);

// 2. load rebusFiles.js to init rebus
require('./rebusFile.js');

// 3. create the root component by Rebus.
var app = Rebus.execute({akey:'GET_TODOAPP',from:'app.js'});
ReactDOM.render(
	app,
	document.getElementById('todoapp')
	);