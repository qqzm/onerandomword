Ext.define('OneRandomWord.view.list.List', {
	extend: 'Ext.panel.Panel',
	xtype: 'options',

	requires: [
		'OneRandomWord.view.list.ListController',
		'OneRandomWord.view.list.ListModel',
		'Ext.grid.Grid'
	],

	controller: 'list',
	viewModel: {
		type: 'list'
	},

	layout: 'card',

	tbar: {
		items: [
			{
				iconCls: 'x-fa fa-arrow-left',
				handler: 'backClick'
			},
			'->',
			{
				//iconCls: 'x-fa fa-arrow-left',
				text: 'Presets',
				handler: 'buttonClick'
			},
			{
				//iconCls: 'x-fa fa-arrow-left',
				text: 'Options',
				handler: 'buttonClick'
			},
			{
				//iconCls: 'x-fa fa-arrow-left',
				text: 'Word Lists',
				handler: 'buttonClick'
			}
		]
	},

	items: [{
		xtype: 'panel',
		title: 'Presets',
		defaults: {
			labelWidth: 325,
			style: {
				paddingLeft: '10px'
			}
		},
		listeners: {
			initialize: 'createRadioGroup'
		}
	},{
		xtype: 'panel',
		title: 'Options',
		defaults: {
			xtype: 'checkbox',
			labelWidth: 325,
			style: {
				paddingLeft: '10px'
			}
		},
		items: [
			{
				label: 'Single words only',
				itemId: 'singleWordsOnly',
				checked: true,
				listeners: {
					change: 'settingChange'
				}
			},{
				label: 'Child-friendly words only',
				itemId: 'childFriendlyWordsOnly',
				listeners: {
					change: 'settingChange'
				}
			},{
				label: 'Refresh when changing to landscape',
				itemId: 'generateLandscape',
				checked: true
			},{
				label: 'Refresh when changing to portrait',
				itemId: 'generatePortrait'
			},
			{
				xtype: 'label',
				tpl: '{count} words selected',
				hidden: true
			},
			{
				xtype: 'spinnerfield',
				itemId: 'timerLength',
				label: 'Timer Length (seconds)',
				value: 0,
				minValue: 0,
				maxValue: 60,
				maxWidth: 420,
				listeners: {
					change: 'timerChange'
				}
			}
		]
	},{
		xtype: 'panel',
		title: 'Word Lists',
		layout: 'fit',
		//scrollable: false,
		//flex: 2,
		items: [{
			xtype: 'grid',
			store: 'Categories',
			//scrollable: false,
			hideHeaders: true,
	
			columns: [{
				dataIndex: 'id',
				hidden: true,
				width: 50
			}, {
				dataIndex: 'label',
				flex: 3
			}, {
				dataIndex: 'wordCount',
				flex: 1
			}, {
				xtype: 'checkcolumn',
				dataIndex: 'selected',
				flex: 1,
				listeners: {
					checkchange: 'onCheck'
				}
			}],
	
			listeners: {
				painted: 'onCheck'
			}
		}]
	}]
	
});
