Ext.define('OneRandomWord.view.word.WordController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.word',

	initialise: function(sender) {
		this.taskRunner = Ext.create('Ext.util.TaskRunner').newTask({
			run: this.updateTimer,
			scope: this,
			interval: 1000
		});

		sender.element.on(
			'swipe', 
			function(event) {
				var mainPanel = sender.up('app-main');
				if (event.direction == 'right' || event.direction == 'down') {
					mainPanel.fireEvent('generate', true);
				}
				else if (event.direction == 'left' || event.direction == 'up') {
					mainPanel.fireEvent('generate', false);
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

	setText: function(wordPanel, data) {
		// Update displayed word and category.
		var label = wordPanel.up('app-main').down('#categoryLabel');
		label.setData(data);

		wordPanel.setData(data);
		this.setSize(wordPanel);
	},

	setSize: function(wordPanel) {
		// Expand the current text to fill the current screen size.
		var wordWrapper = wordPanel.bodyElement.dom;
		var wordDiv = Ext.getDom('word_div');
		var fontSize = 1200;

		do {
			wordDiv.style.fontSize = fontSize + 'px';
			fontSize -= 10;
		}
		while ((wordDiv.scrollHeight > wordDiv.clientHeight) || (wordDiv.scrollWidth > wordDiv.clientWidth) || (wordWrapper.clientHeight < wordDiv.clientHeight) || (wordWrapper.clientWidth < wordDiv.clientWidth));
	},

	updateTimer: function() {
		var wordPanel = this.getView();
		var timerLabel = wordPanel.down('#timerToolbar').down('label');
		var data = timerLabel.getData();
		data.current_time--;
		timerLabel.setData(data);

		if (data.current_time == 0) {
			wordPanel.fireEvent('stoptimer');
			wordPanel.fireEvent('settext', wordPanel, {
				word: 'Time up'
			});
		};
	},

	startClick: function() {
		var wordPanel = this.getView();
		var timerLabel = wordPanel.down('#timerToolbar').down('label');
		var data = timerLabel.getData();
		if (data.current_time == 0) {
			data.current_time = data.time;
			timerLabel.setData(data);
		}
		this.taskRunner.start();
	},

	stopClick: function() {
		this.taskRunner.stop();
	},

	resetClick: function() {
		this.taskRunner.stop();
		var timerLabel = this.getView().down('#timerToolbar').down('label');
		var data = timerLabel.getData();
		data.current_time = data.time;
		timerLabel.setData(data);
	}
});
