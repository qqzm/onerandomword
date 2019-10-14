Ext.define('OneRandomWord.view.list.ListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.list',

	/*
	selectAll: function(button) {
		this.setSelection(button, true);
	},

	selectNone: function(button) {
		this.setSelection(button, false);
	},

	setSelection(sender, selected) {
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var rec = categoryStore.getAt(i);
			rec.set('selected', selected);
			rec.commit();
		}
		this.onCheck(sender);
	},
	*/

	onCheck: function(sender) {
		var totalWords = 0;
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var rec = categoryStore.getAt(i);
			if (rec.get('selected')) {
				totalWords += rec.get('wordCount');
			}
		}
		
		sender.up('options').down('label').setData({
			count: totalWords
		});
	},

	createRadioGroup: function(sender) {
		var presetStore = Ext.getStore('Presets');
		presetStore.load({
			callback: function(records) {
				for (var i=0; i<records.length; i++) {
					var rec = records[i];
					sender.add({
						xtype: 'radiofield',
						name: 'preset',
						value: rec.get('id'),
						label: rec.get('label'),
						labelWidth: 200,
						style: {
							paddingLeft: '10px'
						},
						listeners: {
							check: 'onChangePreset'
						}
					});
				}
			}
		});
	},

	onChangePreset: function(preset) {
		var presetStore = Ext.getStore('Presets');
		var presetRec = presetStore.getAt(presetStore.findExact('id', preset.getValue()));
		var bitmask = presetRec.get('bitmask');
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var category = categoryStore.getAt(i);
			var selected = ((category.get('presets') & bitmask) == bitmask);
			category.set('selected', selected);
			category.commit();
		}
		this.onCheck(preset);
	}
});
