var APP = function () {
	var postits = localStorage.getItem("postits") ? JSON.parse(localStorage.getItem("postits")): [];
	var manageNoPostitMessage = function() {
		if ($(".postit").length === 0) {
			$(".no-postit").show();
		}else {
			$(".no-postit").hide();
		}
		console.log("manageNoPostitMessage +postits nb : "+postits.length);
	}
	var findPostitIndex = function (postits,postitId) {
		for (var i = 0; i < postits.length; i++) {
			console.log(postits[i]);
			if(postits[i].id == postitId){
				console.log("found at #"+i);
				return i;
			}
		}
		throw new Error("postit #"+postitId+" not found !");
	};
	var addPostit= function(object) {
		var data = object.data || object ; //tips to manage when function is called via jquery event on click 
		console.log("data  "+data);
		var $postit = $("<div/>", {
			class : "postit",
			html:'<a class=\"delete-postit glyphicon glyphicon-remove\"></a> <a class=\"save-postit glyphicon glyphicon-save\"></a><div contenteditable=\"true\" class=\"postit-content text-center\">'+data.content+'</div>'

		});
		$postit.attr("id",data.id);
		$postit.appendTo(".post-it-container");
		manageNoPostitMessage() ;

	}
	var savePostit = function (postit) {
		if(postit.hasOwnProperty("id")) {
			var postitIndex=findPostitIndex(postits,postit.id)
			postits[postitIndex]=postit;
		}else {
			var ids = postits.map(function(postit) {
				return postit.id ; 
			});
			//auto id generation, a WS should handle that
			postit.id =postits.length==0 ? 0 : Math.max.apply(null,ids)+1 ;
			var id = postits.push(postit);
			console.log("new id"+postit.id);
		}
		localStorage.setItem("postits", JSON.stringify(postits));
		return postit.id ;
	}

	var deletePostit = function (postitId) {
		var postitIndex=findPostitIndex(postits,postitId);
		var removed =postits.splice(postitIndex, 1);
		console.log("postit # "+removed.id+"has been removed") ;
		localStorage.setItem("postits", JSON.stringify(postits));
	}


	var startListener = function () {
		$(".container").on("click","#save-all", function () {
			$("a.save-postit").click();
		});

		$(".post-it-container").on("click","a.delete-postit", function () {
			var $postit=$(this).closest(".postit");
			var postitId =parseInt($postit.attr("id"));
			if (!isNaN(postitId)) {
				deletePostit(postitId);	
			}
			$postit.remove();
			manageNoPostitMessage() ;
		});

		$(".container").on("click","#add-new-note", {content:"nouveau postit"},addPostit);

		$(".post-it-container").on("click","a.save-postit", function () {
			var $postit=$(this).closest(".postit");
			var postitId =parseInt($postit.attr("id"));
			var postitContent =$postit.find(".postit-content").text() ;
			console.log("saving postit #"+ postitId );
			var postit = isNaN(postitId) ? {content:postitContent} : {id:postitId, content:postitContent};
			console.log(postit);
			var updateId =  savePostit(postit); 
		$postit.attr("id", updateId); //update div with id info for new postit	
	});
	}

	var populate = function () {
		for (var i = 0; i < postits.length; i++) {
			console.log(postits[i]);
			addPostit(postits[i]);
		};
	}
	return {
		populate : function() {
			populate();
		},
		startListener: function() {
			startListener();
		}
	}

} ();


$(document).ready(function () {
	APP.startListener();
	APP.populate() ; 
	setTimeout(function() {
		$("#loader").css("display","none");
		$(".container").css("display","inherit");
	}, 500);
});