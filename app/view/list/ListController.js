Ext.define('OneRandomWord.view.list.ListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.list',
	

	backClick: function(sender) {
		// Switch to the word page.
		var mainPanel = sender.up('app-main');
		mainPanel.setActiveItem(0);
	},

	buttonClick: function(sender) {
		var optionsPanel = sender.up('options');
		if (sender._text == 'Presets') {
			optionsPanel.setActiveItem(0);
		}
		else if (sender._text == 'Options') {
			optionsPanel.setActiveItem(1);
		}
		else if (sender._text == 'Word Lists') {
			optionsPanel.setActiveItem(2);
		}
	},

	settingChange: function(sender) {
		var mainPanel = sender.up('app-main');
		mainPanel.deduplication = {};
		var optionsPanel = sender.up('options');
		var singleWords = optionsPanel.down('#singleWordsOnly').isChecked();
		var childFriendlyWords = optionsPanel.down('#childFriendlyWordsOnly').isChecked();
		var wordStore = Ext.getStore('Words');

		var filters = [];
		if (singleWords) {
			filters.push({
				property: 'is_single_word',
				value: true
			});
		}
		if (childFriendlyWords) {
			filters.push({
				property: 'is_child_friendly',
				value: true
			});
		}

		// Remove all current filtering.
		var currentFilters = wordStore.getFilters().items;
		for (var i = 0; i < currentFilters.length; i++) {
			wordStore.removeFilter(currentFilters[i]);
		}

		// Apply the new filters.
		wordStore.filter(filters);
	},

	timerChange: function(sender, newValue) {
		var mainPanel = sender.up('app-main');
		var timerToolbar = mainPanel.down('#timerToolbar');
		timerToolbar.setHidden(newValue == 0);
		timerToolbar.down('label').setData({
			time: newValue,
			current_time: newValue,
			word_count: 0
		});
	},

	onCheck: function(sender) {
		var mainPanel = sender.up('app-main');
		mainPanel.deduplication = {};
		/*
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
		*/
	},

	createRadioGroup: function(sender) {
		var me = this;
		var presetStore = Ext.getStore('Presets');
		presetStore.load({
			callback: function(records) {
				for (var i = 0; i < records.length; i++) {
					var rec = records[i];
					sender.add({
						xtype: 'radiofield',
						name: 'preset',
						checked: rec.get('is_default'),
						value: rec.get('id'),
						label: rec.get('label'),
						listeners: {
							check: 'onChangePreset'
						}
					});
				}
				me.settingChange(sender);
			}
		});
	},

	onChangePreset: function(preset) {
		var presetStore = Ext.getStore('Presets');
		var presetRec = presetStore.getAt(presetStore.findExact('id', preset.getValue()));
		var bitmask = presetRec.get('bitmask');

		// Turn categories on and off.
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var category = categoryStore.getAt(i);
			var selected = ((category.get('presets') & bitmask) == bitmask);
			category.set('selected', selected);
			category.commit();
		}

		// Change settings.
		var optionsPanel = preset.up('options');
		optionsPanel.down('#singleWordsOnly').setChecked(presetRec.get('is_single_word_only'));
		optionsPanel.down('#resizeText').setChecked(presetRec.get('resize_text'));
		optionsPanel.down('#timerLength').setValue(presetRec.get('timer'));

		this.onCheck(preset);
	}
});
