;(function($) {
	var defaults = {
		"width": "300px",
		"height": "200px",
		"words": "hello world",
		"yesCallback": function(){},
		"noCallback": function() {
			$("#layoutFrame",top.document).fadeOut("normal");
		}

	};

	$.confirm = function(options) {
		var options = $.extend(defaults, options);
		$("#layout-div",top.document).css({"width": options.width, "height": options.height});
		$("#layout-div",top.document).css("display", "block");

		$("#layoutFrame",top.document).contents().find(".words-output").html(options.words);
		$("#layoutFrame",top.document).contents().find(".yes-button").click(function(event) {
			options.yesCallback();
		});
		$("#layoutFrame",top.document).contents().find(".no-button").click(function(event) {
			$("#layout-div",top.document).css("display", "none");
		});
	}

	$.input = function(options) {
		var options = $.extend(defaults, options);
		$("#layout-div",top.document).css({"width": options.width, "height": options.height});
		$("#layout-div",top.document).css("display", "block");
		$("#layoutFrame",top.document).contents().find(".words-output").html(options.words);
		$("#layoutFrame",top.document).contents().find(".notice-word").append('<textarea id="inputContainer"></textarea>');
		$("#layoutFrame",top.document).contents().find(".yes-button").click(function(event) {
			options.yesCallback();
		});
		$("#layoutFrame",top.document).contents().find(".no-button").click(function(event) {
			$("#layout-div",top.document).css("display", "none");
		});
	}

})(jQuery);