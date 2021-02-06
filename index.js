/**
 * Required External Modules
 */

import express from 'express';
// const path = require('path');
import bodyParser from 'body-parser';

import axios from 'axios';

import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const accessUrl = process.env.secret

/**
 * App Variables
 */

const app = express();
const PORT = 3000;

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.use(bodyParser.json());

// app.get('/', (req, res) => {
// 	res.status(200).send('Hello World');
// });

app.post('/', (req, res) => {
	res.send('POST');
	const order = req.body;
	const orderId = order.id;

	const testCustomerId = 4518786891927;
	// console.log({ orderId });
	// const customerUrl = `${accessUrl}/api/2021-01/customers.json`;
	const customerUrl = `${accessUrl}/customers/${testCustomerId}/metafields.json`;


	// /admin/customers/#{id}/metafields.json
	const testMetafield = {
		"metafield": {
			"namespace": "add name",
			"key": "add key",
			"value": 'testing adding metafields',
			"value_type": "string"
		}
	}

	axios.post(customerUrl, testMetafield)
		.then(res => console.log({res}))
		.catch(error => console.log({error}))

// get customer
	// axios.get(customerUrl)
	// 	.then((res) => { 
	// 		console.log(res.data);
	// 	})
	// 	.catch(error => console.log({error}))


	///admin/customers/#{id}/metafields.json
	///admin/orders/#{id}/metafields.json
})

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

