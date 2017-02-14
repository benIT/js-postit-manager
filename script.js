var STORAGE_KEY = 'postits'
var storage = {
	fetch: function () {
		var postits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		storage.uid = postits.length ;
		console.log(postits);
		return postits ;
	},
	save: function (postits) {
		localStorage.setItem(STORAGE_KEY, angular.toJson(postits)) ;
	}
}

angular.module('app', []).controller('postitController', function($scope) {
	$scope.postits = storage.fetch();

	$scope.addPostit = function() {
		$scope.postits.push({id:100,content:"foobar"});
		storage.save($scope.postits);
	};

	$scope.removePostit = function(postit) {
		console.log(postit);
		$scope.postits.splice($scope.postits.indexOf(postit), 1) ; 
		storage.save($scope.postits);
	};

	$scope.$watch('postits', function (newVal, oldVal) {
		storage.save($scope.postits);
	}, true);

});

setTimeout(function() {
	$("#loader").css("display","none");
	$(".container").css("display","inherit");
}, 500);