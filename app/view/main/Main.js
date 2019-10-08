/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('OneRandomWord.view.main.Main', {
	extend: 'Ext.tab.Panel',
	xtype: 'app-main',

	requires: [
		'Ext.MessageBox',
		'Ext.layout.Fit'
	],

	controller: 'main',
	viewModel: 'main',

	defaults: {
		tab: {
			iconAlign: 'top'
		}
	},

	tabBarPosition: 'bottom',

	items: [
		{
			title: 'Generate',
			iconCls: 'x-fa fa-refresh',
			layout: 'fit',
			items: [{
				xtype: 'word'
			}],
			tab: {
				listeners: {
					tap: 'generate'
				}
			}
		},{
			title: 'Previous',
			iconCls: 'x-fa fa-chevron-circle-left',
			tab: {
				listeners: {
					tap: 'generate'
				}
			}
		},{
			title: 'Word Lists',
			iconCls: 'x-fa fa-cog',
			layout: 'fit',
			items: [{
				xtype: 'categorylist'
			}]
		},
	],

	listeners: {
		resize: 'resize'
	}
});
