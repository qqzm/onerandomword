Ext.define('OneRandomWord.store.Presets', {
	extend: 'Ext.data.Store',
	storeId: 'Presets',
	remoteFilter: false,
	proxy: {
		cors: true,
		useDefaultXhrHeader: false,
		type: 'ajax',
		timeout: 120000,
		// @sw-cache
		url: "https://www.1word.app/interface.php",
		extraParams: {
			action: 'presets'
		}
	},
	pageSize: 64000
});

Ext.create('OneRandomWord.store.Presets');
