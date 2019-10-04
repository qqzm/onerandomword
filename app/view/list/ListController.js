Ext.define('OneRandomWord.view.list.ListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.list',

	selectAll: function() {
		this.setSelection(true);
	},

	selectNone: function() {
		this.setSelection(false);
	},

	setSelection(selected) {
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var rec = categoryStore.getAt(i);
			rec.set('selected', selected);
			rec.commit();
		}
	}
});
