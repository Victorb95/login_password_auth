const form = document.querySelector('form');

const loginElem = document.querySelector('input[name="login"]');
const passwordElem = document.querySelector('input[name="password"]');

const btLogin = document.querySelector('#btLogin');
const btRegister = document.querySelector('#btRegister');

// ----------------- form submission -----------------

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let formData = {
		login: loginElem.value,
		password: passwordElem.value
	}

	const hasEmptyField = Object.values(formData).some(v => v.length == 0);
	if (hasEmptyField) return alert('Empty inputs');

	if (e.submitter == btRegister) return server.tryRegister(formData, res => alert(res));

	server.tryLogin(formData, res => alert(res));
});


// ----------------- requests -----------------

async function request(url, method, data, callback) {
	const response = await fetch(url,
		{
			method: method,
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())

	return callback(response)
}

const server = {
	URL: 'http://localhost:3000',
	tryLogin(data, callback) {
		request(server.URL + '/login', 'POST', data, (res) => callback(JSON.parse(res)))
	},
	tryRegister(data, callback) {
		request(server.URL + '/register', 'POST', data, (res) => callback(JSON.parse(res)))
	}
}
