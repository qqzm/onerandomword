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
						me.generate(sender);
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
				me.generate(sender);
			}
			// Left or up arrow.
			else if (event.keyCode == 37 || event.keyCode == 38) {
				me.generate(sender, true);
			}
		};
	},

	resize: function(sender) {
		var me = this;
		if (Ext.getStore('Words').isLoaded()) {
			var enableLandscape = sender.down('#generateLandscape').getChecked();
			var enablePortrait = sender.down('#generatePortrait').getChecked();
			if ((Ext.Viewport.getOrientation() == 'portrait' && enablePortrait) ||
				(Ext.Viewport.getOrientation() == 'landscape' && enableLandscape)) {
				me.generate(sender);
			}
			me.setSize();
		}
	},

	generate: function(sender, isBack) {
		var mainPanel = sender.up('app-main');
		if (!Ext.isDefined(mainPanel)) mainPanel = sender;
		var wordPanel = mainPanel.down('word');
		if (!Ext.isDefined(wordPanel)) return;

		var wordStore = Ext.getStore('Words');
		var categoryStore = Ext.getStore('Categories');

		// If no categories are enabled.
		if (categoryStore.findExact('selected', true) == -1) {
			// Show error.
			this.setText(wordPanel, {
				word: 'No word lists enabled'
			});
			return;
		}

		// If no words exist
		if (wordStore.getCount() == 0) {
			// Show error.
			this.setText(wordPanel, {
				word: 'No words'
			});
			return;
		}

		// Go through the wordlist until we find one in an enabled category.
		var word;
		var category;
		do {
			if (isBack) { // Go backwards.
				this.lastIndex--;
				if (this.lastIndex < 0) {
					this.lastIndex = wordStore.getCount() - 1;
				}
			}
			else { // Is forwards.
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
		wordPanel.fireEvent('settext', wordPanel, word.data);
		//this.setText(wordPanel, word.data);
	}
});
