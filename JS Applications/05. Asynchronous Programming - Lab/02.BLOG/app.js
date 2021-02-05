function attachEvents() {
    let loadPostsBtn = document.querySelector('#btnLoadPosts');
    let viewPostBtn = document.querySelector('#btnViewPost');
    let posts = document.querySelector('#posts');
    let title = document.querySelector('#post-title');
    let body = document.querySelector('#post-body');
    let ulElement = document.querySelector('#post-comments');

    loadPostsBtn.addEventListener('click', () => {

        fetch('https://blog-apps-c12bf.firebaseio.com/posts.json')
            .then(res => res.json())
            .then(date => {
                let options = Object.keys(date).map(key => `<option value="${key}">${date[key].title}</option>`).join();
                posts.innerHTML = options;
                ulElement.innerHTML = '';
            })
    });

    viewPostBtn.addEventListener('click', () => {
        fetch(`https://blog-apps-c12bf.firebaseio.com/posts/${posts.value}.json`)
            .then(res => res.json())
            .then(date => {
                ulElement.innerHTML = '';
                title.textContent = date.title;
                body.textContent = date.body;
                let commits = date.comments.map(x => `<li>${x}</li>`).join();
                ulElement.innerHTML = commits;
            })
    });
}

attachEvents();