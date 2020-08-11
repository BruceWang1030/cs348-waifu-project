"use strict";

$(document).ready(function () {
	var form = $("#searchForm");
	if(window.localStorage["filterData_anime"]) {
		var rawFormData = JSON.parse(window.localStorage["filterData_anime"]);
		var elems = document.getElementById("searchForm").elements;
		rawFormData.forEach(data => {
			elems[data.name].value = data.value;
		});
	}
	function obtainNewData(e) {
		$(":checkbox").each((ind, check) => {
			if(check.checked) {
				check.parentElement.classList.remove("btn-secondary");
				check.parentElement.classList.add("btn-primary");
			} else {
				check.parentElement.classList.add("btn-secondary");
				check.parentElement.classList.remove("btn-primary");
			}
		});
		var rawFormData = form.serializeArray();
		window.localStorage["filterData_anime"] = JSON.stringify(rawFormData);
		var processed = {};
		rawFormData.forEach(data => {
			var name = data.name;
			var value = data.value;
			if(name.includes("-")) {
				var splitInd = name.indexOf("-");
				var splitFirst = name.substr(0, splitInd);
				var splitSecond = name.substr(splitInd + 1);
				if(processed[splitFirst] === undefined) {
					processed[splitFirst] = [];
				}
				if(value === "on") {
					processed[splitFirst].push(splitSecond);
				}
			} else {
				processed[name] = value;
			}
		});
		$.ajax({
			type: "POST",
			url: "/anime_list_query",
			data: JSON.stringify(processed),
			contentType: "application/json",
			success: function(result) {
				$("#main_list").html(result);
			}
		});
		if(e) {
			e.preventDefault();
		}
	}
	form.on("input", obtainNewData);
	form.on("submit", obtainNewData);
	obtainNewData();

	var pageDom = $("#page");

	$("#btn_prev_page").on("click", function(e) {
		e.preventDefault();
		pageDom.val(Math.max(1, pageDom.val() - 1));
		obtainNewData();
	});

	$("#btn_next_page").on("click", function(e) {
		e.preventDefault();
		pageDom.val(parseInt(pageDom.val()) + 1);
		obtainNewData();
	});

	getTags("/allAnimeTags", (config) => {
		var whitelist = $("#tags_whitelist");
		setupTagsOnly(whitelist, config);
		whitelist.bind('typeahead:select', function(ev, suggestion) {
			obtainNewData();
		});

		var blacklist = $("#tags_blacklist");
		setupTagsOnly(blacklist, config);
		blacklist.bind('typeahead:select', function(ev, suggestion) {
			obtainNewData();
		});
	});
});

