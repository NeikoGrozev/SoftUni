function loadCommits() {
    let username = document.querySelector('#username').value;
    let repository = document.querySelector('#repo').value;
    let ulElement = document.querySelector('#commits');
    let url = `https://api.github.com/repos/${username}/${repository}/commits`

    fetch(url)
        .then(res => {

            if (!res.ok) {
                throw res;
            }

            return res.json()
        })
        .then(date => {

            let currentCommits = date.map(x => `<li>${x.commit.author.name}: ${x.commit.message}" </li>`)
            ulElement.innerHTML = currentCommits;
        })
        .catch(err => {
            ulElement.innerHTML = `<li>Error: ${err.status} (${err.statusText})</li>`
        })
}