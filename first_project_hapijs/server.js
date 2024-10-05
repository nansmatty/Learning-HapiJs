"use strict";

import Hapi from "@hapi/hapi";
import HapiLocation from "hapi-geo-locate";

const init = async () => {
	const server = Hapi.Server({
		host: "localhost",
		port: "4000",
	});

	await server.register({
		plugin: HapiLocation,
		options: {
			enabledByDefault: true,
		},
	});

	server.route([
		{
			method: "GET",
			path: "/",
			handler: (request, h) => {
				return "<h1>Hello World!</h1>";
			},
		},
		{
			method: "GET",
			path: "/location",
			handler: (request, h) => {
				const location = request.location;
				return h.response(location);
			},
		},
		{
			method: "GET",
			path: "/users/{user}",
			handler: (request, h) => {
				return `<h1>Hello ${request.params.user}</h1>`;
			},
		},
		//By adding question mark in parameter it became not mandantory parameter that means without passing the parameter the route still work
		{
			method: "GET",
			path: "/not_madantory/{user?}",
			handler: (request, h) => {
				if (request.params.user) {
					return `<h1>Hello ${request.params.user}</h1>`;
				}
				return `<h1>Hello Stranger</h1>`;
			},
		},
		// Query parameters
		{
			method: "GET",
			path: "/query_parameter",
			handler: (request, h) => {
				return `<h1>Hello ${request.query.name} ${
					request.query.lastname ? request.query.lastname : ""
				}</h1>`;
			},
		},

		//redirections
		{
			method: "GET",
			path: "/redirection",
			handler: (request, h) => {
				return h.redirect("/");
			},
		},
		//Handling 404 pages
		{
			method: "GET",
			path: "/{any*}",
			handler: (request, h) => {
				return "<h1>Oh no! You must be lost!</h1>";
			},
		},
	]);

	await server.start();
	console.log("Server running on: ", server.info.uri);
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
