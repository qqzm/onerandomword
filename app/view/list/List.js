Ext.define('OneRandomWord.view.list.List', {
	extend: 'Ext.tab.Panel',
	xtype: 'options',

	requires: [
		'OneRandomWord.view.list.ListController',
		'OneRandomWord.view.list.ListModel',
		'Ext.grid.Grid',
		'Ext.tab.Panel'
	],

	controller: 'list',
	viewModel: {
		type: 'list'
	},

	tabBarPosition: 'bottom',
	defaults: {
		scrollable: 'vertical',
		tab: {
			iconAlign: 'top'
		}
	},

	items: [{
		xtype: 'panel',
		title: 'Presets',
		iconCls: 'x-fa fa-sliders',
		defaults: {
			labelWidth: 325,
			style: {
				paddingLeft: '10px'
			}
		},
		listeners: {
			initialize: 'createRadioGroup'
		},
		tbar: {
			items: [{
				text: 'Back',
				iconCls: 'x-fa fa-arrow-left',
				handler: 'backClick'
			}]
		}
	},{
		xtype: 'panel',
		title: 'Options',
		iconCls: 'x-fa fa-cog',
		defaults: {
			xtype: 'checkbox',
			labelWidth: 330,
			width: 360,
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
			},{
				label: 'Resize text to fill the screen',
				itemId: 'resizeText',
				checked: true
			},
			/*
			{
				xtype: 'label',
				tpl: '{count} words selected',
				hidden: true
			},
			*/
			{
				xtype: 'spinnerfield',
				itemId: 'timerLength',
				label: 'Timer Length (seconds)',
				value: 0,
				minValue: 0,
				maxValue: 60,
				labelWidth: 220,
				listeners: {
					change: 'timerChange'
				}
			}
		],
		tbar: {
			items: [{
				text: 'Back',
				iconCls: 'x-fa fa-arrow-left',
				handler: 'backClick'
			}]
		}
	},{
		xtype: 'panel',
		title: 'Word Lists',
		iconCls: 'x-fa fa-list-ul',
		layout: 'fit',
		items: [{
			xtype: 'grid',
			store: 'Categories',
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
		}],
		tbar: {
			items: [{
				text: 'Back',
				iconCls: 'x-fa fa-arrow-left',
				handler: 'backClick'
			}]
		}
	},{
		xtype: 'panel',
		title: 'Words',
		iconCls: 'x-fa fa-edit',
		layout: 'fit',
		items: [{
			xtype: 'grid',
			store: 'Words',
			//hideHeaders: true,
	
			columns: [{
				dataIndex: 'id',
				hidden: true,
				width: 50
			}, {
				dataIndex: 'word',
				flex: 3
			}, {
				dataIndex: 'is_single_word',
				flex: 1
			}, {
				dataIndex: 'is_child_friendly',
				flex: 1
			}]
		}],
		tbar: {
			items: [{
				text: 'Back',
				iconCls: 'x-fa fa-arrow-left',
				handler: 'backClick'
			}]
		}
	}]
	
});
