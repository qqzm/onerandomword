Ext.define('OneRandomWord.view.list.ListController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.list',

	selectAll: function(button) {
		this.setSelection(button, true);
	},

	selectNone: function(button) {
		this.setSelection(button, false);
	},

	setSelection(sender, selected) {
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var rec = categoryStore.getAt(i);
			rec.set('selected', selected);
			rec.commit();
		}
		this.onCheck(sender);
	},

	onCheck: function(sender) {
		var totalWords = 0;
		var categoryStore = Ext.getStore('Categories');
		for (var i = 0; i < categoryStore.getCount(); i++) {
			var rec = categoryStore.getAt(i);
			if (rec.get('selected')) {
				totalWords += rec.get('wordCount');
			}
		}
		
		sender.up('categorylist').down('label').setData({
			count: totalWords
		});
	}
});
