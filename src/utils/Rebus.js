var _store = {},
	_hookMap = {},
	_actionMap = {};

var _config = {
	printArgu : false,
	showHooks : true
}

//Debug Functions
var _debug = {
	showHooks : function(){}
}

function init(){
	if(_config.showHooks){
		_debug.showHooks = function(key,hooks){
			console.log({
				storeKey : key,
				hooks 	 : hooks
			});
		}
	}
}

//init the Rebus
init();

module.exports = {

	do:function(){
		var actionKey = Array.prototype.shift.call(arguments),
			fns = _actionMap[actionKey],
			result = null,
			self = this;

		if(!(fns instanceof Array))
			return;

		result = fns[0].apply(self, arguments);

		for(var i=1,len=fns.length; i<len; i++){
			if(fns[i] instanceof Function){
				Array.prototype.unshift.call(arguments,actionKey);
				fns[i].apply(self,arguments);
			}else{
				console.error("Error: "+fns[i]+" is not a function.");
			}
		}

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
		var actionKey = this.actionKey;
		if(fns instanceof Array){
			for(var i in fns){
				_actionMap[actionKey].push(fns[i]);
			}
		}else{
			console.error("Error: The argument for and() must be an array of Function.");
		}
	},

	addStoreListener : function(storeKeys,hook){
		var fns;//某个store变化时，要执行的组件更新方法（钩子函数）
		for(var i in storeKeys){
			fns = _hookMap[storeKeys[i]] || [];
			fns.push(hook);
			_hookMap[storeKeys[i]] = fns;
		}
	},

	removeStoreListener : function(storeKeys,hook){
		for(var i in storeKeys){
			var hooks = _hookMap[storeKeys[i]];
			for(var j in hooks){
				if(hooks[j] === hook){
					hooks.splice(j,1);
				}
			}
			_hookMap[storeKeys[i]] = hooks;
		}
	},

	initStore : function(store){
		_store = store;
	},

	getStore : function(key){
		if(key){
			return _store[key];
		}else{
			return _store;
		}
	},

	setStore : function(key, val){
		//1.更新store的值
		_store[key] = val;
		//2.触发监听该store的组件钩子函数
		var hooks = _hookMap[key];
		for(var i=0,len=hooks.length; i<len; i++){
			hooks[i]();
		}
		//3.debug
		_debug.showHooks(key,hooks);
	},

};
