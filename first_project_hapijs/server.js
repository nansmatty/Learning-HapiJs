"use strict";

import Hapi from "@hapi/hapi";

const init = async () => {
	const server = Hapi.Server({
		host: "localhost",
		port: "4000",
	});

	server.route({
		method: "GET",
		path: "/",
		handler: (request, h) => {
			return "<h1>Hello World!</h1>";
		},
	});

	server.route({
		method: "GET",
		path: "/users/{user}",
		handler: (req, res) => {
			return `<h1>Hello ${req.params.user}</h1>`;
		},
	});

	//By adding question mark in parameter it became not mandantory parameter that means without passing the parameter the route still work
	server.route({
		method: "GET",
		path: "/not_madantory/{user?}",
		handler: (req, res) => {
			if (req.params.user) {
				return `<h1>Hello ${req.params.user}</h1>`;
			}
			return `<h1>Hello Stranger</h1>`;
		},
	});

	// Query parameters
	server.route({
		method: "GET",
		path: "/query_parameter",
		handler: (req, res) => {
			return `<h1>Hello ${req.query.name} ${req.query.lastname ? req.query.lastname : ""}</h1>`;
		},
	});

	//redirections
	server.route({
		method: "GET",
		path: "/redirection",
		handler: (req, res) => {
			return res.redirect("/");
		},
	});

	//Handling 404 pages
	server.route({
		method: "GET",
		path: "/{any*}",
		handler: (req, res) => {
			return "<h1>Oh no! You must be lost!</h1>";
		},
	});

	await server.start();
	console.log("Server running on: ", server.info.uri);
};

process.on("unhandledRejection", (err) => {
	console.log(err);
	process.exit(1);
});

init();
