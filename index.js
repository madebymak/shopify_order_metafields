/**
 * Required External Modules
 */

import express from 'express';
// const path = require('path');
import bodyParser from 'body-parser';


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
// 	res.status(200).send('Hello World 132');
// });

app.post('/', (req, res) => { 
	res.send('POST');
	console.log(req.body);
})

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});

