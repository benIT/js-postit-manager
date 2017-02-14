var STORAGE_KEY = 'postits'
var storage = {
  fetch: function () {
    var postits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    storage.uid = postits.length ;
    return postits ;
  },
  save: function (postits) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(postits)) ;
  }
}

var app = new Vue({
	el: '.container',
	data: { 
		postits: storage.fetch()
	},
	watch: {
		postits: {
			handler: function (val, oldVal) {
				console.log('postit changed from'+oldVal+" to "+val) ;
				storage.save(this.postits);
			},
			deep: true
		}
	},
	methods: {
		removePostit: function (postit) {
			this.postits.splice(this.postits.indexOf(postit), 1) ; 
		},
		addNewPostit : function () {
			this.postits.push({
				id: this.postits.length,
				content: "new postit"
			});
		},
	}
});
setTimeout(function() {
	$("#loader").css("display","none");
	$(".container").css("display","inherit");
}, 500);