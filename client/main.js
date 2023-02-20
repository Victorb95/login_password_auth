const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	let object = {};
	formData.forEach((value, key) => object[key] = value);

	const hasempty = Object.values(object).some(v => v.trim().length == 0)
	if (hasempty) return alert('Empty inputs')

	server.tryLogin(object, (res) => {
		console.log('res', res);
	})
});

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
	tryLogin(data, callback) {
		request('http://localhost:3000', 'POST', data, (res) => callback(JSON.parse(res)))
	}
}
