Ext.define('OneRandomWord.view.list.List', {
	extend: 'Ext.Container',
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

	layout: 'vbox',

	items: [{
		xtype: 'panel',
		title: 'Presets',
		listeners: {
			initialize: 'createRadioGroup'
		}
	},{
		xtype: 'panel',
		title: 'Word Lists',
		layout: 'fit',
		flex: 1,
		tbar: {
			items: [
				/*
				{
					xtype: 'button',
					text: 'All',
					iconCls: 'x-fa fa-check-circle',
					handler: 'selectAll'
				},
				{
					xtype: 'button',
					text: 'None',
					iconCls: 'x-fa fa-ban',
					handler: 'selectNone'
				},
				'->',
				*/
				{
					xtype: 'label',
					tpl: '{count} words selected'
				}
			]
		},
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
		}]
	}]
	
});
