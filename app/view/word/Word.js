
Ext.define('OneRandomWord.view.word.Word',{
	extend: 'Ext.panel.Panel',
	xtype: 'word',

	requires: [
		'OneRandomWord.view.word.WordController',
		'OneRandomWord.view.word.WordModel'
	],

	controller: 'word',
	viewModel: {
		type: 'word'
	},

	style: {
		paddingLeft: '50px',
		paddingRight: '50px'
	},

	tpl: '<div id="word_div" style="font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;text-align:center;color:slategray;">{word}</div>'
	//tpl: '<svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice"><text font-size="12" fill="slategray" style="font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" width="75%" height="auto">{word}</text></svg>'
});
