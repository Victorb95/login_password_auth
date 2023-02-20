import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(cors(), express.json(), express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
	console.log('req body', req.body);
	res.json(JSON.stringify({ test: 'testev' }));
});

app.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});