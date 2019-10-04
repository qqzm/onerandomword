
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

	tpl: '<p style="padding-top:50px;padding-bottom:50px;position:relative;top:50%;transform:translateY(-50%);text-align:center;line-height:1.0;font-size:calc(14vw + 2vmin);color:slategray;font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;">{word}</p>'
});
