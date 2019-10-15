
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

	tbar: {
		style: {
			background: '#5FA2DD'
		},
		items: [
			{
				xtype: 'label',
				itemId: 'category_label',
				tpl: '<span style="font-size:small;font-family:Roboto,Gill Sans,Helvetica,sans-serif;color:white;">{category_label}</span>'
			},
			'->',
			{
				//iconCls: 'x-fa fa-edit',
				xtype: 'textfield',
				itemId: 'customText',
				width: 150,
				listeners: {
					change: 'editText'
				}
			},
			{
				iconCls: 'x-fa fa-cog',
				handler: 'optionsClick'
			}
		]
	},

	tpl: '<div id="word_div" style="padding-left:50px;padding-right:50px;overflow:auto;font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;line-height:1.2;text-align:center;color:slategray;">{word}</div>',
	//tpl: '<svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice"><text font-size="12" fill="slategray" style="font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" width="75%" height="auto">{word}</text></svg>'

	listeners: {
		initialize: 'initialise',
		settext: 'setText',
		setsize: 'setSize'
	}
});
