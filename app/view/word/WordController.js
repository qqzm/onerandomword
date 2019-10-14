Ext.define('OneRandomWord.view.word.WordController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.word',

	initialise: function(sender) {
		sender.element.on(
			'swipe', 
			function(event) {
				var mainPanel = sender.up('app-main');
				if (event.direction == 'right' || event.direction == 'down') {
					mainPanel.fireEvent('generate', sender, true);
				}
				else if (event.direction == 'left' || event.direction == 'up') {
					mainPanel.fireEvent('generate', sender);
				}
			},
			sender
		);
	},

	optionsClick: function(sender) {
		// Switch to the options page.
		var mainPanel = sender.up('app-main');
		mainPanel.setActiveItem(1);
	},

	editText: function(sender, newValue) {
		var mainPanel = sender.up('app-main');
		var wordPanel = mainPanel.down('word');
		if (!Ext.isDefined(wordPanel)) return;

		this.setText(wordPanel, {
			word: newValue,
			category_label: 'User entered'
		});
	},

	setText(wordPanel, data) {
		// Update displayed word and category.
		var label = wordPanel.up('app-main').down('#category_label');
		label.setData(data);

		wordPanel.setData(data);
		this.setSize();
	},

	setSize() {
		var wordWrapper = document.getElementById("word_wrapper");
		var wordDiv = document.getElementById("word_div");
		var fontSize = 1200;

		do {
			wordDiv.style.fontSize = fontSize + 'px';
			fontSize -= 10;
		}
		while ((wordDiv.scrollHeight > wordDiv.clientHeight) || (wordDiv.scrollWidth > wordDiv.clientWidth) || (wordWrapper.clientHeight < wordDiv.clientHeight) || (wordWrapper.clientWidth < wordDiv.clientWidth));
	},
});
