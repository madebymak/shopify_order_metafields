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
			// console.log({customerMetafieldList});

			let referralExist = false;
			// console.log({ customerMetafieldList });
			referralExist = customerMetafieldList.find(metafield => metafield.namespace == 'referral_email');
			// add referral metafield
			// referralExist || addReferralEmail(customerUrl, testMetafield);
			return referralExist ? console.log('skipped') : addReferralEmail(customerUrl, testMetafield);
		})
		.catch(error => console.log({ error }));

	///admin/customers/#{id}/metafields.json
	///admin/orders/#{id}/metafields.json

}

const addReferralEmail = (url, data) => {
	axios.post(url, data)
		.then(() => console.log('added'))
		.catch(error => console.log({error}))
}
