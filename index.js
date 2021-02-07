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

const accessUrl = process.env.shopify_secret;

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

	const customerUrl = `${accessUrl}/customers/${testCustomerId}/metafields.json`;
	const orderUrl = `${accessUrl}/orders/${order.id}/metafields.json`;
	// get order from webhook

	// get customer id from order
	// const customerId = order.customer.id;

	// add metafield to customer
	// /admin/orders/#{id}/metafields.json

	// /admin/customers/#{id}/metafields.json
	const testMetafield = {
		"metafield": {
			"namespace": "referral_email",
			"key": "email",
			"value": 'jon@email.com',
			"value_type": "string"
		}
	}

	// check if metafield exists
	axios.get(customerUrl)
		.then((res) => {
			const customerMetafieldList = res.data.metafields;
			let referralExist = false;
			// console.log({ customerMetafieldList });
			customerMetafieldList.filter((metafield) => {
				if (metafield.namespace == 'referral_email') {
					referralExist = true;
				}
			});

			// add referral metafield
			// referralExist || addReferralEmail(customerUrl, testMetafield);
			referralExist ? console.log('skipped') : addReferralEmail(customerUrl, testMetafield);
		})
		.catch(error => console.log({error}));


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

const addReferralEmail = (url, data) => {
	console.log('bang');

	axios.post(url, data)
		// .then(res => console.log({ res }))
		.then(() => console.log('added'))
		.catch(error => console.log({error}))
}

