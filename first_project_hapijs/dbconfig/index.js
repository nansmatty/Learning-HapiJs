import Sequelize from "sequelize";

const sequelize = new Sequelize("hapi_tutorial", "root", "pass", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		const [results, metadata] = await sequelize.query("SELECT * FROM users");
		console.log(results);
		const [results2, metadata2] = await sequelize.query(
			"UPDATE users SET username = 'Nikita' WHERE user_id = 3"
		);
		console.log(metadata2);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

testConnection();
