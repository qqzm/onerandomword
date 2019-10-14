/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('OneRandomWord.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.main',

	resize: function(sender) {
		var me = this;
		if (Ext.getStore('Words').isLoaded()) {
			if (Ext.Viewport.getOrientation() == 'portrait') {
				me.generate(sender);
			}
		}
		else {
			me.lastIndex = 0;
			Ext.getStore('Categories').load({
				callback: function() {
					Ext.getStore('Words').load({
						callback: function() {
							me.generate(sender);
						}
					});
				}
			});
		}
	},

	generate: function(sender) {
		var tabPanel = sender.up('tabpanel');
		if (!Ext.isDefined(tabPanel)) tabPanel = sender;
		var wordPanel = tabPanel.down('word');
		if (!Ext.isDefined(wordPanel)) return;

		var wordStore = Ext.getStore('Words');
		var categoryStore = Ext.getStore('Categories');

		// If no categories are enabled.
		if (categoryStore.findExact('selected', true) == -1) {
			// Show error.
			wordPanel.setData({
				word: 'No word lists enabled'
			});
			return;
		}

		// If no words exist
		if (wordStore.getCount() == 0) {
			// Show error.
			wordPanel.setData({
				word: 'No words'
			});
			return;
		}

		// Go through the wordlist until we find one in an enabled category.
		var word;
		var category;
		do {
			if (sender._title == 'Previous') { // Back button.
				this.lastIndex--;
				if (this.lastIndex < 0) {
					this.lastIndex = wordStore.getCount() - 1;
				}
			}
			else { // Generate button or resize event.
				this.lastIndex++;
				if (this.lastIndex >= wordStore.getCount()) {
					this.lastIndex = 0;
				}
			}
			
			word = wordStore.getAt(this.lastIndex);
			category = categoryStore.getAt(categoryStore.findExact('id', word.get('category_id')));
			word.set('category_label', category.get('label'));
		}
		while (category.get('selected') == false);

		// Update displayed word.
		wordPanel.setData(word.data);
		window.fitText(document.getElementById("word_div"));
		// Set the active item ourseleves and return false to prevent the default switching.
		tabPanel.setActiveItem(0);
		return false;
	}
});
