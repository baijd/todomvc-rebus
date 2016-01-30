var assign = require('object-assign');

var _stateTree = {},
	_hookMap = {},
	_actionMap = {};

//Config of Rebus
var _config = {
	showListener : false,
	showAction: false,
}

//Debug Tools
var _tools = {
	showListener: function(){},
	showAction 	: function(){},
}

function _showListener(key){
	var str = '[Listeners]: '+key+'-->',
		hooks = _hookMap[key];
	for(var i in hooks){ str += hooks[i].listener+'/'; }
	console.log(str);
}

function _showAction(){
	console.log(arguments);
}

module.exports = {
	initConfig: function(config){
		_config = assign({}, _config, config);
		_tools.showListener = _config.showListener ? _showListener : function(){};
		_tools.showAction= _config.showAction ? _showAction : function(){};
	},

	initState : function(stateTree){
		_stateTree = stateTree;
	},

	getState : function(key){
		if(key){
			return _stateTree[key];
		}else{
			return _stateTree;
		}
	},

	//更新某个State
	setState : function(key, val){
		//1.更新state的值
		_stateTree[key] = val;
		//2.触发监听该state的组件钩子函数
		var hooks = _hookMap[key];
		for(var i=0,len=hooks.length; i<len; i++){
			hooks[i]();
		}
		//3.debug
		_tools.showListener(key);
	},

	execute : function(){
		var actionHead = Array.prototype.shift.call(arguments),
			akey = actionHead['akey'],
			from = actionHead['from'],
			fns  = _actionMap[akey],
			result = null,
			self = this;

		//打印调试信息
		_tools.showAction(akey,from,arguments);

		//fns的长度等于0，则该action还没对应的实现方法。
		if(undefined===fns || 0===fns.length){
			console.error('Error: There is no roote for this Action:'+akey+" from "+from);
			return null;
		}

		//fns的第一个函数是通过connect方法绑定进来的，是该action的实现方法，可能由返回值，将返回值保存在result。
		result = fns[0].apply(self, arguments);

		//执行fns中的其它函数，即通过and方法绑定进来的其它函数，这些函数调试工具，也可能是其它关心这个action的service。
		Array.prototype.unshift.call(arguments,actionHead);
		for(var i=1,len=fns.length; i<len; i++){
			if(fns[i] instanceof Function){
				fns[i].apply(self,arguments);
			}else{
				console.error("Error: "+fns[i]+" is not a function.");
			}
		}

		//返回fns[0]的执行结果，不管这个action是否需要同步返回值，返回就是。
		return result;
	},

	connect : function(actionKey, fn){
		if(fn instanceof Function){
			_actionMap[actionKey] = _actionMap[actionKey] || [];
			_actionMap[actionKey][0] = fn;
			this.actionKey = actionKey;
			return this;
		}else{
			console.log("fn is not a Function.");
		}
	},

	and : function(fns){
		var akey = this.actionKey;
		if(fns instanceof Array){
			_actionMap[akey] = _actionMap[akey].concat(fns);
		}else{
			console.error("Error: The argument for and() must be an array of Function.");
		}
	},

	addStateListener : function(stateKeys,hook){
		var fns;//某个state变化时，要执行的组件更新方法（钩子函数）
		for(var i in stateKeys){
			fns = _hookMap[stateKeys[i]] || [];
			fns.push(hook);
			_hookMap[stateKeys[i]] = fns;
		}
	},

	removeStateListener : function(stateKeys,hook){
		for(var i in stateKeys){
			var hooks = _hookMap[stateKeys[i]];
			for(var j in hooks){
				if(hooks[j] === hook){
					hooks.splice(j,1);
				}
			}
			_hookMap[stateKeys[i]] = hooks;
		}
	},

	printStateTree : function(stateKey){
		if(stateKey){
			console.log(_stateTree[stateKey]);
		}else{
			console.log(_stateTree);
		}
	},

	printStateListener : function(stateKey){
		if(stateKey){
			_showListener(stateKey);
		}else{
			for(var key in _hookMap){
				_showListener(key);
			}
		}
	},

};