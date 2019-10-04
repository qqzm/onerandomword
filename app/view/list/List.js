Ext.define('OneRandomWord.view.list.List', {
	extend: 'Ext.Panel',
	xtype: 'categorylist',

	requires: [
		'OneRandomWord.view.list.ListController',
		'OneRandomWord.view.list.ListModel',
		'Ext.grid.Grid'
	],

	controller: 'list',
	viewModel: {
		type: 'list'
	},

	title: 'Word Lists',
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
			flex: 1
		}]
	}],

	tbar: {
		items: [
			{
				xtype: 'button',
				text: 'Select All',
				iconCls: 'x-fa fa-check-circle',
				handler: 'selectAll'
			},
			{
				xtype: 'button',
				text: 'Select None',
				iconCls: 'x-fa fa-ban',
				handler: 'selectNone'
			}
		]
	}
});
