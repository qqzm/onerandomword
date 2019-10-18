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

	layout: 'card',

	items: [{
		xtype: 'word'
	},{
		xtype: 'options'
	}],

	listeners: {
		initialize: 'initialise',
		generate: 'generate'
	},

	deduplication: {}
});
