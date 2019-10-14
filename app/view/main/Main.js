/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('OneRandomWord.view.main.Main', {
	extend: 'Ext.panel.Panel',
	xtype: 'app-main',

	requires: [
		'Ext.MessageBox',
		'Ext.layout.Card'
	],

	controller: 'main',
	viewModel: 'main',

	tbar: {
		items: [
			'->',
			{
				//iconCls: 'x-fa fa-edit',
				xtype: 'textfield',
				width: 300,
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

	layout: 'card',

	items: [
		{xtype: 'word'},
		{xtype: 'options'}
	],

	listeners: {
		resize: 'resize',
		initialize: 'initialise'
	}
});
