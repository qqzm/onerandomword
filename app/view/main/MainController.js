/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('OneRandomWord.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.main',

	initialise: function(sender) {
		var me = this;

		// Perform initial load.
		me.lastIndex = 0;
		Ext.getStore('Categories').load({
			callback: function() {
				Ext.getStore('Words').load({
					callback: function() {
						me.generate(false);
					}
				});
			}
		});

		// Setup event handlers
		document.onkeyup = function(event) {
			// Ignore key event unless word display is focussed.
			if (sender.getActiveItemIndex() != 0) return;
			// Right or down arrow.
			if (event.keyCode == 39 || event.keyCode == 40) {
				me.generate(false);
			}
			// Left or up arrow.
			else if (event.keyCode == 37 || event.keyCode == 38) {
				me.generate(true);
			}
		};
	},

	resize: function() {
		var me = this;
		var mainPanel = me.getView()
		if (Ext.getStore('Words').isLoaded()) {
			var enableLandscape = mainPanel.down('#generateLandscape').getChecked();
			var enablePortrait = mainPanel.down('#generatePortrait').getChecked();
			if (((Ext.Viewport.getOrientation() == 'portrait') && enablePortrait) ||
				((Ext.Viewport.getOrientation() == 'landscape') && enableLandscape)) {

				// If the user has entered custome text, don't overwrite it
				var customText = mainPanel.down('#customText').getValue();
				if (!Ext.isEmpty(customText)) return;
				me.generate(false);
			}
			else {
				var wordPanel = mainPanel.down('word');
				wordPanel.fireEvent('setsize', wordPanel);
			}
		}
	},

	generate: function(isBack) {
		var wordPanel = this.getView().down('word');
		if (!Ext.isDefined(wordPanel)) return;

		var wordStore = Ext.getStore('Words');
		var categoryStore = Ext.getStore('Categories');

		// If no categories are enabled.
		if (categoryStore.findExact('selected', true) == -1) {
			// Show error.
			wordPanel.fireEvent('settext', wordPanel, {
				word: 'No word lists enabled',
				error: true
			}, false);
			return;
		}

		// If no words exist
		if (wordStore.getCount() == 0) {
			// Show error.
			wordPanel.fireEvent('settext', wordPanel, {
				word: 'No words',
				error: true
			}, false);
			return;
		}

		// Go through the wordlist until we find one in an enabled category.
		var word;
		var category;
		var newIndex = this.lastIndex;
		do {
			if (isBack) { // Go backwards.
				newIndex--;
				if (newIndex < 0) {
					newIndex = wordStore.getCount() - 1;
				}
			}
			else { // Is forwards.
				newIndex++;
				if (newIndex >= wordStore.getCount()) {
					newIndex = 0;
				}
			}
			
			word = wordStore.getAt(newIndex);
			category = categoryStore.getAt(categoryStore.findExact('id', word.get('category_id')));
			word.set('category_label', category.get('label'));
		}
		while (category.get('selected') == false);

		// Update displayed word.
		this.lastIndex = newIndex;
		wordPanel.fireEvent('settext', wordPanel, word.data, isBack);
	}
});
