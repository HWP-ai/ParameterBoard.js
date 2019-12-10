//=============================================================================
// ParameterBoard.js
//=============================================================================

/*:
 * @plugindesc (v0.0000001) The RPG Maker MV centralism
 * @author zhangsan
 *
 * @help
 *
 * 卷名和章名已经自动入存档。
 *
 * 函数（脚本）
 *
 *    /////////// 当前卷名
 *    $gameParameterBoard.nowVolumn
 *    /////////// 当前章名
 *    $gameParameterBoard.nowChapter
 *
 *    /////////// 设置卷名，卷名和章名不要用空格或其他符号，可以用下划线
 *    $gameParameterBoard.setVolumn("第一卷")
 *    /////////// 设置章名，卷名和章名不要用空格或其他符号，可以用下划线
 *    $gameParameterBoard.setChapter("第一章")
 *
 *    /////////// 判断是否当前处于某卷，配合事件分支使用
 *    $gameParameterBoard.ifNowVolumn("第一卷")
 *
 *    /////////// 判断是否当前处于某章，配合事件分支使用
 *    $gameParameterBoard.ifNowChapter("第一章")
 *
 *    /////////// 设置某卷某章某角色某行动某题目的值
 *    $gameParameterBoard.moveTo("第一卷", "第一章", "新手村村长", "行动0", "个人存款", "100")
 *    $gameParameterBoard.moveTo("第一卷", "第一章", "新手村村长", "行动0", "道路建设费", "200")
 * 
 *    /////////// 取消某卷某章某角色某行动某题目
 *    $gameParameterBoard.unassign("第一卷", "第一章", "新手村村长", "行动0", "个人存款")
 *
 *    /////////// 获得某卷某章某角色某行动某题目的值
 *    $gameParameterBoard.entityValue("第一卷", "第一章", "新手村村长", "行动0", "个人存款")
 *
 *    /////////// 检测是否有某卷某章某角色某行动某题目
 *    $gameParameterBoard.haveEntity("第一卷", "第一章", "新手村村长", "行动0", "个人存款")
 *
 *    /////////// 检测是否有某卷某章某角色某行动某题目
 *    $gameParameterBoard.haveNoEntity("第一卷", "第一章", "新手村村长", "行动0", "个人存款")
 *
 *    /////////// 检测是否有某卷某章某角色某行动某题目是否等于
 *    $gameParameterBoard.equalEntity("第一卷", "第一章", "新手村村长", "行动0", "道路建设费", "200")
 *    
 * Plugin Command:
 *
 * nowVolumn
 * nowChapter
 * setVolumn "volumn X"
 * setChapter "chapter Y"
 * ifNowVolumn "volumn 0"
 * ifNowChapter "chapter 0"
 * moveTo "volumn 0" "chapter 0" "role 0" "act 0" "entity 0" "123"
 * unassign "volumn 0" "chapter 0" "role 0" "act 0" "entity 0"
 * entityValue "volumn 0" "chapter 0" "role 0" "act 0" "entity 0"
 * haveEntity "volumn 0" "chapter 0" "role 0" "act 0" "entity 0"
 * equalEntity "volumn 0" "chapter 0" "role 0" "act 0" "entity 0" "123.4"
 *
 * $$ParameterBoard$$Debug$$Alert "volumn 0" "chapter 0" "role 0" "act 0"
 * $$ParameterBoard$$Debug$$Prompt "volumn 0" "chapter 0" "role 0" "act 0" "value of act 0"
 */

var $gameParameterBoard = null;

function Game_ParameterBoard() {
	this.initialize.apply(this, arguments);
}

Game_ParameterBoard.prototype.initialize = function() {
	this.nowVolumn = 'volumn 0';
	this.nowChapter = 'chapter 0';
	this.clear();
};

Game_ParameterBoard.prototype.clear = function() {
    this._entity = {};
};

Game_ParameterBoard.prototype.setVolumn = function(name){
	this.nowVolumn = name;
}

Game_ParameterBoard.prototype.setChapter = function(name){
	this.nowChapter = name;
}

Game_ParameterBoard.prototype.ifNowVolumn = function(name){
	return this.nowVolumn == name;
}

Game_ParameterBoard.prototype.ifNowChapter = function(name){
	return this.nowChapter == name;
}

Game_ParameterBoard.prototype.moveTo = function(volume, chapter, role, act, name, assign){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			ptr[a[i]] = {};
		}
		ptr = ptr[a[i]];
	};
	ptr[name] = assign;
	this.onChange();
}

Game_ParameterBoard.prototype.unassign = function(volume, chapter, role, act, name){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			ptr[a[i]] = {};
		}
		ptr = ptr[a[i]];
	};
	delete ptr[name];
	this.onChange();
}

Game_ParameterBoard.prototype.entityValue = function(volume, chapter, role, act, name){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			ptr[a[i]] = {};
		}
		ptr = ptr[a[i]];
	};
	return ptr[name];
}

Game_ParameterBoard.prototype.haveEntity = function(volume, chapter, role, act, name){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			return false;
		}
		ptr = ptr[a[i]];
	};
	return ptr.hasOwnProperty(name);
}

Game_ParameterBoard.prototype.haveNoEntity = function(volume, chapter, role, act, name){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			return true;
		}
		ptr = ptr[a[i]];
	};
	return !ptr.hasOwnProperty(name);
}

Game_ParameterBoard.prototype.equalEntity = function(volume, chapter, role, act, name, Compare){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			ptr[a[i]] = {};
		}
		ptr = ptr[a[i]];
	};
	return ptr[name] == Compare;
}

Game_ParameterBoard.prototype.$$Debug__$$Alert = function(volume, chapter, role, act){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			alert("No such act can find");
			return false;
		}
		ptr = ptr[a[i]];
	};
	var buffer = ["Grid<%1><%2><%3><%4> :\n".format([volume, chapter, role, act])];
	for(var name in ptr){
		buffer.push("\t%1: %2\n".format(name, ptr[name]));
	}
	alert(buffer.join(""));
};

Game_ParameterBoard.prototype.$$Debug__$$Prompt = function(volume, chapter, role, act, prompt_string, name){
	var a = [volume, chapter, role, act];
	var ptr = this._entity;
	for(var i=0; i<4; i++){
		if(!ptr.hasOwnProperty(a[i])){
			return false;
		}
		ptr = ptr[a[i]];
	};
	var value = prompt(prompt_string);
	ptr[name] = value;
};

Game_ParameterBoard.prototype.onChange = function() {
    $gameMap.requestRefresh();
};

(function(){

	var _createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function(){
		_createGameObjects.call(DataManager);
		$gameParameterBoard = new Game_ParameterBoard();
	}

	var _makeSavefileInfo = DataManager.makeSavefileInfo;
	DataManager.makeSavefileInfo = function(){
		var info = _makeSavefileInfo.call(DataManager);
		info.volumn = $gameParameterBoard.nowVolumn;
		info.chapter = $gameParameterBoard.nowChapter;
		return info;
	};

	var _makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function(){
		var contents = _makeSaveContents.call(DataManager);
		contents.entity = JSON.stringify($gameParameterBoard._entity);
		contents.volumn = $gameParameterBoard.nowVolumn;
		contents.chapter = $gameParameterBoard.nowChapter;
		return contents;
	};

	var _extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents){
		_extractSaveContents.call(DataManager, contents);
		$gameParameterBoard._entity = JSON.parse(contents.entity);
		$gameParameterBoard.nowVolumn = contents.volumn;
		$gameParameterBoard.nowChapter = contents.chapter;
	};

	var _pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_pluginCommand.call(this, command, args)
		if (command == '$$nowVolumn'){
			return $gameParameterBoard.nowVolumn;
		} else if (command == '$$nowChapter'){
		 	return $gameParameterBoard.nowVolumn;
		} else if (command == '$$setVolumn'){
			$gameParameterBoard.setVolumn.apply($gameParameterBoard, args);
		} else if (command == '$$setChapter'){
			$gameParameterBoard.setChapter.apply($gameParameterBoard, args);
		} else if (command == '$$ifNowVolumn'){
			return $gameParameterBoard.ifNowVolumn.apply($gameParameterBoard, args);
		} else if (command == '$$ifNowChapter'){
			return $gameParameterBoard.ifNowChapter.apply($gameParameterBoard, args);
		} else if (command == '$$moveTo'){
			$gameParameterBoard.moveTo.apply($gameParameterBoard, args);
		} else if (command == '$$unassign'){
			$gameParameterBoard.unassign.apply($gameParameterBoard, args);
		} else if (command == '$$entityValue'){
			$gameParameterBoard.entityValue.apply($gameParameterBoard, args);
		} else if (command == '$$haveEntity'){
			$gameParameterBoard.haveEntity.apply($gameParameterBoard, args);
		} else if (command == '$$haveNoEntity'){
			$gameParameterBoard.haveNoEntity.apply($gameParameterBoard, args);
		} else if (command == '$$equalEntity'){
			$gameParameterBoard.equalEntity.apply($gameParameterBoard, args);
		} else if (command == '$$ParameterBoard$$Debug$$Alert'){
			$gameParameterBoard.$$Debug__$$Alert.apply($gameParameterBoard, args);
		} else if (command == '$$ParameterBoard$$Debug$$Prompt'){
			$gameParameterBoard.$$Debug__$$Prompt.apply($gameParameterBoard, args);
		}
	};

})();
