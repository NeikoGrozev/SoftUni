function loadRepos() {
	let inputElement = document.querySelector('#username');
	let ulElement = document.querySelector('#repos');
	let url = `https://api.github.com/users/${inputElement.value}/repos`;

	fetch(url)
		.then(res => res.json())
		.then(date => {
			ulElement.innerHTML = date.map(x => `<li><a href="${x.html_url}">${x.name}</a></li>`).join();
		})
}