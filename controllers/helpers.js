import axios from 'axios';

import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const accessUrl = process.env.shopify_secret;

export const updateOrder = (req, res) => {
	res.status(200).send('POST');

	const order = req.body;
	const orderId = order.id;

	const testCustomerId = 4518786891927;
	const testOrderId = 3182383136919;

	const customerUrl = `${accessUrl}/customers/${testCustomerId}/metafields.json`;
	const orderUrl = `${accessUrl}/orders/${testOrderId}/metafields.json`;

	const testMetafield = {
		"metafield": {
			"namespace": "referral_email",
			"key": "email",
			"value": 'jon@email.com',
			"value_type": "string"
		}
	}

	// add to order metafields
	axios.get(orderUrl)
		.then((order) => {
			console.log(order.data);
			// addMetafield(orderUrl, testMetafield)
		});


	// check if metafield exists
	// axios.get(customerUrl)
	// 	.then((res) => {
	// 		const customerMetafieldList = res.data.metafields;
	// 		let referralExist = false;

	// 		referralExist = customerMetafieldList.find(metafield => metafield.namespace == 'referral_email');
	// 		// add referral metafield
	// 		// return referralExist || addMetafield(customerUrl, testMetafield);
	// 		return referralExist ? console.log('skipped') : addMetafield(customerUrl, testMetafield);
	// 	})
	// 	.catch(error => console.log({ error }));

}

const addMetafield = (url, data) => {
	axios.post(url, data)
		.then(() => console.log('added'))
		.catch(error => console.log({error}))
}
