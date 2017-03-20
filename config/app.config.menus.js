(function () {

	'use strict';

	// app menu settings
	APP.config.menus = {
		"Home": [],

		"Movies" : [
			{
			  "category": {"label": "Trending", "state": "movies.trending"},
			  "sections": []
			},
			{
			  "category": {"label": "Hottest", "state": "movies.hottest"},
			  "sections": []
			},
			{
			  "category": {"label": "Action", "state": "movies.action"},
			  "sections": []
			},
			{
			  "category": {"label": "Comedy", "state": "movies.comedy"},
			  "sections": []
			},
			{
			  "category": {"label": "Other", "state": "movies.other"},
			  "sections": []
			}
		]
	};
}());