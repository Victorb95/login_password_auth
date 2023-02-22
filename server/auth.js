import crypto from 'crypto';

// ---------------------- crypto ----------------------

const randomBytes = 16;
function createPassword(password) {
	let salt = crypto.randomBytes(randomBytes).toString('hex');
	return crypto.createHash('sha256').update(password + salt).digest('hex') + salt;
}

function checkPassword(password, dbHash) {
	let salt = dbHash.substr(-randomBytes * 2)
	let hash = crypto.createHash('sha256').update(password + salt).digest('hex') + salt
	return hash == dbHash;
}

// ---------------------- dummyDB ----------------------
const dummyDB = [
	{
		id: 1,
		login: 'testUser',
		password: createPassword('testPassword')
	}
]

// ---------------------- login/register ----------------------

function tryLogin(data) {
	let user = dummyDB.find(e => e.login == data.login);
	if (!user) return 'need register';

	if (checkPassword(data.password, user.password)) {
		return 'Login successful';
	}
	else return 'Incorrect password';
}

function registerUser(data) {
	let user = dummyDB.find(e => e.login == data.login);
	if (user) return 'Already registered , try login'

	const newUser = {
		id: dummyDB.length + 1,
		login: data.login,
		password: createPassword(data.password)
	};

	dummyDB.push(newUser);
	return 'User registration successful';
}

export { tryLogin, registerUser };
