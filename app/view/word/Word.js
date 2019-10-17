
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

	recentWords: [],

	tbar: {
		style: {
			background: '#5FA2DD'
		},
		items: [
			{
				xtype: 'label',
				itemId: 'categoryLabel',
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

	tpl: '<div id="word_div" style="padding-left:20px;padding-right:20px;overflow:auto;font-family:Roboto,Gill Sans,Helvetica,sans-serif;font-weight:600;line-height:1.2;text-align:center;color:slategray;">{word}</div>',

	bbar: {
		itemId: 'timerToolbar',
		hidden: true,
		style: {
			background: '#5FA2DD'
		},
		items: [{
			xtype: 'label',
			tpl: '<div style="font-size:x-large;font-family:Roboto,Gill Sans,Helvetica,sans-serif;color:white;"><span>Time: {current_time}</span><span style="padding-left:20px;">Word: {word_count}</span></div>',
			data: {
				current_time: 0,
				time: 30,
				word_count: 0
			}
		},'->',{
			iconCls: 'x-fa fa-play',
			itemId: 'timerButton',
			handler: 'timerClick'
		},{
			iconCls: 'x-fa fa-history',
			handler: 'resetClick'
		}]
	},

	listeners: {
		initialize: 'initialise',
		settext: 'setText',
		setsize: 'setSize',
		stoptimer: 'timerClick'
	}
});
