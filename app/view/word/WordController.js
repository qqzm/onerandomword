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
		}, false);
	},

	setText: function(wordPanel, data, isBack) {
		// Only update text if timer is disabled or running.
		var timerToolbar = wordPanel.down('#timerToolbar');
		var timerEnabled = timerToolbar.isVisible();
		var timerStopped = !Ext.isDefined(this.taskRunner.stopped) || this.taskRunner.stopped;
		if (timerEnabled && timerStopped) return;

		// Update displayed word and category.
		var label = wordPanel.up('app-main').down('#categoryLabel');
		label.setData(data);
		wordPanel.setData(data);
		this.setSize(wordPanel);

		if (!Ext.isDefined(data.error) || !data.error) {
			var timerLabel = timerToolbar.down('label');
			var timerData = timerLabel.getData();
			if (isBack) {
				if (timerData.word_count == 1) {
					return;
				}
				timerData.word_count--;
				wordPanel.recentWords.pop();
			}
			else {
				timerData.word_count++;
				wordPanel.recentWords.push(data.word);
			}
			timerLabel.setData(timerData);
		}
	},

	setSize: function(wordPanel) {
		// Expand the current text to fill the current screen size.
		var resizeTextOption = wordPanel.up('app-main').down('#resizeText').getChecked();

		var wordWrapper = wordPanel.bodyElement.dom;
		var wordDiv = Ext.getDom('word_div');
		var fontSize = 1200;

		if (!resizeTextOption) {
			wordDiv.style.fontSize = '48px';
			return;
		}

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
			var words = '';
			for (var i=0; i<wordPanel.recentWords.length; i++) {
				words += '<br/>' + wordPanel.recentWords[i];
			}
			wordPanel.fireEvent('settext', wordPanel, {
				word: '<font color="#B80F0A">Time up!</font>' + words,
				error: true
			}, false);
			wordPanel.fireEvent('stoptimer');
		};
	},

	timerClick: function() {
		var wordPanel = this.getView();
		var timerButton = wordPanel.down('#timerButton');
		var timerStopped = !Ext.isDefined(this.taskRunner.stopped) || this.taskRunner.stopped;

		if (timerStopped) {
			timerButton.setIconCls('x-fa fa-stop');
			var timerLabel = wordPanel.down('#timerToolbar').down('label');
			var data = timerLabel.getData();
			if (data.current_time == 0 || data.current_time == data.time) {
				data.current_time = data.time;
				data.word_count = 0;
				timerLabel.setData(data);
				wordPanel.recentWords = [];
			}
			this.taskRunner.start();
			// If this is a new timed turn, generate a new word.
			if (data.current_time == data.time) {
				var mainPanel = wordPanel.up('app-main');
				mainPanel.fireEvent('generate', false);
			}
		}
		else {
			timerButton.setIconCls('x-fa fa-play');
			this.taskRunner.stop();
		}
	},

	resetClick: function() {
		var wordPanel = this.getView();
		this.taskRunner.stop();
		var timerLabel = this.getView().down('#timerToolbar').down('label');
		var data = timerLabel.getData();
		data.current_time = data.time;
		data.word_count = 0;
		timerLabel.setData(data);
		wordPanel.recentWords = [];
	}
});
