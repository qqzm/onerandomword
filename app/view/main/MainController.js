/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('OneRandomWord.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.main',

	initialise: function(sender) {
		// Setup event handlers
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

		sender.element.on(
			'swipe', 
			function(event) {
				// Ignore swipe event unless word display is focussed.
				if (sender.getActiveItemIndex() != 0) return;
				if (event.direction == 'right' || event.direction == 'down') {
					me.generate(sender);
				}
				else if (event.direction == 'left' || event.direction == 'up') {
					me.generate(sender, true);
				}
			},
			sender
		);
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

	optionsClick: function(sender) {
		// Toggle the active item between words and options.
		var mainPanel = sender.up('app-main');
		if (mainPanel.getActiveItemIndex() == 1) {
			mainPanel.setActiveItem(0);
		}
		else {
			mainPanel.setActiveItem(1);
		}
	},

	resize: function(sender) {
		var me = this;
		if (Ext.getStore('Words').isLoaded()) {
			if (Ext.Viewport.getOrientation() == 'portrait') {
				me.generate(sender);
			}
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
		wordPanel.setData(word.data);
		window.fitText(document.getElementById("word_div"));
	}
});
