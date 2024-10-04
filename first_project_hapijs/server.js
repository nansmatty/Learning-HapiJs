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
			return "Hello World!";
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
