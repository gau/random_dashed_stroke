/*
ランダム破線.jsx
Copyright (c) 2015 - 2020 Toshiyuki Takahashi
Released under the MIT license
http://opensource.org/licenses/mit-license.php
http://www.graphicartsunit.com/
*/
(function() {

	// Settings
	var settings = {
		'dashMin': 0,
		'dashMax': 40,
		'gapMin': 3,
		'gapMax': 3,
		'rounded': false
	};

	// Constant
	const SCRIPT_TITLE = 'ランダム破線';
	const SCRIPT_VERSION = '0.5.3';
	const UNIT_STRINGS = ['in', 'mm', 'pt', 'pc', 'cm', '歯', 'px'];

	// Load setting from json file
	var saveOptions = {
		'os' : File.fs,
		'jsxPath' : $.fileName,
		'reverseDomain' : 'com.graphicartsunit',
		'fileName' : 'random_dashed_stroke.json',
		'path' : ''
	};
	saveOptions.path = getSettingFilePath(saveOptions);
	settings = loadSettings() ? loadSettings() : settings;

	// Check the selected items
	if(app.activeDocument.selection.length <= 0) {
		alert('アイテムが選択されていません');
		return false;
	}
	var hasIncompatibleItems = false;
	var incompatibleItems = '・文字オブジェクト\n・複合シェイプ\n・シンボル\n・ラスター画像\n・ライブペイントグループ\n・拡張前の画像トレース';
	var targetItems = getTargetItems(app.activeDocument.selection);
	if(targetItems.length <= 0) {
		var addMessage = hasIncompatibleItems ? '次のアイテムには対応していません\n' + incompatibleItems : '';
		alert('対象となる線が見つかりません。' + addMessage);
		return false;
	} else if(hasIncompatibleItems) {
		alert('選択中に非対応のアイテムが含まれています。次のアイテムは無視されます\n' + incompatibleItems);
	}

	// UI Dialog
	function mainDialog() {
		this.init();
		return this;
	};
	mainDialog.prototype.init = function() {

		var unit = 20,　thisObj = this, groups = {}, panels = {}, buttons = {}, fields = {}, checkboxes = {};
		var currentStrokeUnit = UNIT_STRINGS[app.preferences.getIntegerPreference ('strokeUnits')];

		thisObj.dlg = new Window('dialog', SCRIPT_TITLE + ' - ver.' + SCRIPT_VERSION);
		thisObj.dlg.margins = [unit * 1.5, unit * 1.5, unit * 1.5, unit * 1.5];

		panels.settings = thisObj.dlg.add('panel', undefined, 'ランダムの範囲：');

		groups.dashRange = panels.settings.add('group', undefined);
		groups.dashRange.add('statictext', undefined, '線分：');
		fields.dashMin = groups.dashRange.add('edittext', undefined, settings.dashMin, { name: 'dashMin'});
		groups.dashRange.add('statictext', undefined, '〜');
		fields.dashMax = groups.dashRange.add('edittext', undefined, settings.dashMax, { name: 'dashMax'});
		groups.dashRange.add('statictext', undefined, currentStrokeUnit);

		groups.gapRange = panels.settings.add('group', undefined);
		groups.gapRange.add('statictext', undefined, '間隔：');
		fields.gapMin = groups.gapRange.add('edittext', undefined, settings.gapMin, { name: 'gapMin'});
		groups.gapRange.add('statictext', undefined, '〜');
		fields.gapMax = groups.gapRange.add('edittext', undefined, settings.gapMax, { name: 'gapMax'});
		groups.gapRange.add('statictext', undefined, currentStrokeUnit);

		groups.refreshButton = panels.settings.add('group', undefined);
		groups.refreshButton.alignment = 'center';
		groups.refreshButton.margins = [0, unit / 2, 0, 0];
		buttons.refresh = groups.refreshButton.add('button', undefined, 'ランダム破線を更新', {name: 'refresh'});

		groups.options = thisObj.dlg.add('group', undefined);
		groups.options.margins = [0, 0, 0, 0];
		groups.options.alignment = 'center';
		checkboxes.rounded = groups.options.add('checkbox', undefined, '端数を四捨五入する');
		checkboxes.rounded.value = settings.rounded;

		groups.buttons = thisObj.dlg.add('group', undefined);
		groups.buttons.margins = [unit, unit / 2, unit, unit * 0];
		groups.buttons.alignment = 'center';
		groups.buttons.orientation = 'row';

		buttons.cancel = groups.buttons.add('button', undefined, 'キャンセル', {name: 'cancel'});
		buttons.ok = groups.buttons.add('button', undefined, '決定', { name: 'ok'});

		for(var key in panels) {
			panels[key].alignment = 'left';
			panels[key].margins = [unit, unit, unit, unit];
			panels[key].orientation = 'column';
		}

		for(var key in fields) {
			fields[key].name = key;
			fields[key].alignment = 'left';
			fields[key].bounds = [0, 0, 50, 23];
			fields[key].addEventListener('change', confirmText);
			fields[key].addEventListener('change', previewRefresh);
		}

		buttons.refresh.addEventListener('click', previewRefresh);

		function confirmText(event) {
			var target = event.target;
			if(target.text == '') {
				target.text = 0;
			} else if(!isNaN(Number(target.text)) && Number(target.text) > 1000) {
				alert('1000 以上の値は指定できません');
				target.text = settings[target.properties.name];
			} else if(isNaN(Number(target.text)) || Number(target.text) < 0) {
				alert('0 以上の半角数値を入力してください');
				target.text = settings[target.properties.name];
			}
			settings[target.properties.name] = Number(target.text);
		}

		function previewRefresh(event) {
			try {
				thisObj.preview();
			} catch(e) {
				alert('エラーが発生して処理を実行できませんでした\nエラー内容：' + e);
			}
		}
		checkboxes.rounded.onClick = function() {
			settings.rounded = this.value;
			previewRefresh(null);
		}

		buttons.ok.onClick = function() {
			try {
				app.redo();
			} catch(e) {
				alert('エラーが発生しましたので処理を中止します\nエラー内容：' + e);
			} finally {
				saveSettings();
				thisObj.closeDialog();
			}
		}
		buttons.cancel.onClick = function() {
			thisObj.closeDialog();
		}
	};
	mainDialog.prototype.showDialog = function() {
		this.preview();
		this.dlg.show();
	};
	mainDialog.prototype.closeDialog = function() {
		this.dlg.close();
	};
	mainDialog.prototype.preview = function() {
		mainProcess();
		app.redraw();
		app.undo();
	};
	var dialog = new mainDialog();
	dialog.showDialog();

	// Main process
	function mainProcess() {
		for(var i = 0; i < targetItems.length; i++) {
			if(targetItems[i].typename !== 'TextRange') {
				targetItems[i].strokeDashes = getDashes();
			} else {
				// targetItems[i].characterAttributes.strokeDashes = getDashes();
			}
		}
	}

	// Get target items
	function getTargetItems(items) {
		var ti = [];
		for(var i = 0; i < items.length; i++) {
			if(items[i].typename === 'PathItem') {
				if(items[i].stroked) ti.push(items[i]);
			} else if(items[i].typename === 'GroupItem') {
				ti = ti.concat(getTargetItems(items[i].pageItems));
			} else if(items[i].typename === 'CompoundPathItem') {
				ti = ti.concat(getTargetItems(items[i].pathItems));
			} else if(items[i].typename === 'TextFrame') {
				hasIncompatibleItems = true;
				// ti = ti.concat(getTargetItems(items[i].textRanges));
			} else if(items[i].typename === 'PluginItem' || items[i].typename === 'SymbolItem' || items[i].typename === 'RasterItem') {
				hasIncompatibleItems = true;
			} else if(items[i].typename === 'TextRange') {
				if(items[i].characterAttributes.strokeColor.typename !== 'NoColor') ti.push(items[i]);
			}
		}
		return ti;
	}

	// Get dashes array
	function getDashes() {
		// var maxlength = Math.round(Math.random() * 6);
		var maxlength = 6;
		var dashes = [];
		if(maxlength == 0) return dashes;
		for(var i = 0; i < maxlength; i++) {
			if(i % 2 == 0) {
				dashes.push(getRandom(settings.dashMin, settings.dashMax));
			} else {
				dashes.push(getRandom(settings.gapMin, settings.gapMax));
			}
		}
		return dashes;
	}

	// Get random number
	function getRandom(min, max) {
		var rd = Math.random() * (max - min) + min;
		if(settings.rounded) {
			rd = Math.round(rd);
		}
	    return rd;
	}

	// Get path of json file
	function getSettingFilePath(options) {
		var filepath = '';
		switch(options.os) {
			case 'Macintosh':
				filepath = Folder.userData + '/' + options.reverseDomain + '/Illustrator/Scripts/' + options.fileName;
				break;
			case 'Windows':
				filepath = Folder.userData + '/' + options.reverseDomain + '/Illustrator/Scripts' + options.fileName;
				break;
			default :
				break;
		}
		return filepath;
	}

	// Load settings from json file
	function loadSettings() {
		if(new File(saveOptions.path).exists) {
			var settingFile = new File(saveOptions.path);
			settingFile.encoding = 'UTF-8';
			settingFile.open('r');
			var loadedSettings = settingFile.readln();
			loadedSettings = (new Function('return' + loadedSettings))();
			settingFile.close();
			return loadedSettings;
		} else {
			return false;
		}
	}

	// Save settings to json file
	function saveSettings() {
		var dir = saveOptions.path.match(/(.*)(\/)/)[1];
		if(!new Folder(dir).exists) {
			new Folder(dir).create();
		}
		var settingFile = new File(saveOptions.path);
		settingFile.open('w');
		settingFile.write(settings.toSource());
		settingFile.close();
	}

}());