Ext.define('OneRandomWord.store.Categories', {
	extend: 'Ext.data.Store',
	storeId: 'Categories',
	remoteFilter: false,
	groupField: 'groupLabel',
	proxy: {
		cors: true,
		useDefaultXhrHeader: false,
		type: 'ajax',
		timeout: 120000,
		// @sw-cache
		url: "https://www.puzzlebunny.com/onerandomword/interface.php",
		extraParams: {
			action: 'categories'
		}
	},
	pageSize: 64000
});

Ext.create('OneRandomWord.store.Categories');
