"use strict";

import Hapi from "@hapi/hapi";
import path from "path";
import HapiLocation from "hapi-geo-locate";
import HapiInert from "@hapi/inert";
import HapiVision from "@hapi/vision";
import Handlebars from "handlebars";

const init = async () => {
	const server = Hapi.Server({
		host: "localhost",
		port: "4000",
		routes: {
			files: {
				relativeTo: path.join(path.resolve(), "static"),
			},
		},
	});

	await server.register([
		{
			plugin: HapiLocation,
			options: {
				enabledByDefault: true,
			},
		},
		{
			plugin: HapiInert,
		},
		{
			plugin: HapiVision,
		},
	]);

	server.views({
		engines: {
			html: Handlebars,
		},
		path: path.join(path.resolve(), "views"),
	});

	server.route([
		{
			method: "GET",
			path: "/",
			handler: (request, h) => {
				return h.file("welcome.html");
			},
		},
		{
			method: "POST",
			path: "/login",
			handler: (request, h) => {
				console.log({ formData: request.payload });
				return "HI";
			},
		},
		{
			method: "GET",
			path: "/download",
			handler: (request, h) => {
				return h.file("welcome.html", {
					mode: "attachment",
					filename: "welcome-download.html",
				});
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
		//Dynamic Page data serving
		{
			method: "GET",
			path: "/dynamic",
			handler: (request, h) => {
				const data = {
					name: "Narayan Maity",
				};

				return h.view("index", data);
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
