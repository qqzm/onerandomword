Ext.define('OneRandomWord.store.Words', {
	extend: 'Ext.data.Store',
	storeId: 'Words',
	remoteFilter: false,
	proxy: {
		cors: true,
		useDefaultXhrHeader: false,
		type: 'ajax',
		timeout: 120000,
		// @sw-cache
		url: "https://www.puzzlebunny.com/onerandomword/interface.php",
		extraParams: {
			action: 'words'
		}
	},
	pageSize: 64000
});

Ext.create('OneRandomWord.store.Words');
