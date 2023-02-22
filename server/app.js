import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { tryLogin, registerUser } from './auth.js';
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors(), express.json());

app.post('/login', (req, res) => {
	let resp = tryLogin(req.body);
	res.json(JSON.stringify(resp));
});

app.post('/register', (req, res) => {
	let resp = registerUser(req.body);
	res.json(JSON.stringify(resp));
});

app.listen(port, () => {
	console.log(`Server Running on port ${port}`);
});


