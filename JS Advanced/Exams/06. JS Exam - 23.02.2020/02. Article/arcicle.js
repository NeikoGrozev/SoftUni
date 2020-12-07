class Article {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = new Set();
    }

    get likes() {
        let arr = Array.from(this._likes);
        if (arr.length == 0) {
            return `${this.title} has 0 likes`
        } else if (arr.length == 1) {
            return `${arr[0]} likes this article!`
        }

        return `${arr[0]} and ${arr.length - 1} others like this article!`
    }

    like(username) {

        if (this._likes.has(username)) {
            throw new Error('You can\'t like the same article twice!');
        } else if (this.creator == username) {
            throw new Error('You can\'t like your own articles!');
        }

        this._likes.add(username);

        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        if (this._likes.has(username)) {
            this._likes.delete(username);
            return `${username} disliked ${this.title}`
        }

        throw new Error('You can\'t dislike this article!')
    }

    comment(username, content, id) {
        if (id === undefined || this._comments[id - 1] === undefined) {
            let newId = this._comments.length + 1;
            this._comments.push({
                id: newId,
                username,
                content,
                replies: []
            })

            return `${username} commented on ${this.title}`
        } else {

            let newId = this._comments[id - 1].replies.length + 1;
            this._comments[id - 1].replies.push({
                id: newId,
                username,
                content
            })

            return `You replied successfully`
        }
    }

    toString(sortingType) {
        let result = `Title: ${this.title}`;
        result += '\n';
        result += `Creator: ${this.creator}`;
        result += '\n';
        result += `Likes: ${this._likes.size}`;
        result += '\n';
        result += `Comments:`;

        if (sortingType == 'asc') {

            this._comments.forEach(x => {
                result += '\n';
                result += `-- ${x.id}. ${x.username}: ${x.content}`;
                x.replies.forEach(y => {
                    result += '\n';
                    result += `--- ${x.id}.${y.id}. ${y.username}: ${y.content}`;
                })
            })
        } else if (sortingType == 'desc') {

            for (let i = this._comments.length - 1; i >= 0; i--) {
                result += '\n';
                result += `-- ${this._comments[i].id}. ${this._comments[i].username}: ${this._comments[i].content}`;

                if (this._comments[i].replies.length > 0) {

                    for (let j = this._comments[i].replies.length - 1; j >= 0; j--) {

                        result += '\n';
                        let r = this._comments[i].replies[j];
                        result += `--- ${this._comments[i].id}.${r.id}. ${r.username}: ${r.content}`;
                    }
                }
            }
        } else {
            let comments = this._comments.slice();
            comments.sort((a, b) => a.username.localeCompare(b.username));

            comments.forEach(x => {
                result += '\n';
                result += `-- ${x.id}. ${x.username}: ${x.content}`;

                if(x.replies.length > 0){
                    let replies = x.replies.slice();
                    replies.sort((a, b) => a.username.localeCompare(b.username));

                    replies.forEach(y => {
                        result += '\n';
                        result += `--- ${x.id}.${y.id}. ${y.username}: ${y.content}`;
                    })
                }
            })
        }

        return result;
    }
}

// let art = new Article("My Article", "Anny");
// art.like("John");
// console.log(art.likes);
// art.dislike("John");
// console.log(art.likes);
// art.comment("Sammy", "Some Content");
// console.log(art.comment("Ammy", "New Content"));
// art.comment("Zane", "Reply", 1);
// art.comment("Jessy", "Nice :)");
// console.log(art.comment("SAmmy", "Reply@", 1));
// console.log()
// console.log(art.toString('username'));
// console.log()
// art.like("Zane");
// console.log(art.toString('desc'));

let art = new Article("My Article", "Anny");
console.log(art.like("John"), "John liked My Article!");
console.log(art.likes, "John likes this article!");
console.log(art.like("Ivan"),"Ivan liked My Article!");
console.log(art.like("Steven"), "Steven liked My Article!");
console.log(art.likes, "John and 2 others like this article!");
console.log(art.comment("Anny", "Some Content"),"Anny commented on My Article");
console.log(art.comment("Ammy", "New Content", 1),"You replied successfully");
console.log(art.comment("Zane", "Reply", 2),"Zane commented on My Article");
console.log(art.comment("Jessy", "Nice :)"), "Jessy commented on My Article");
console.log(art.comment("SAmmy", "Reply@", 2), "You replied successfully");
console.log(art.toString('asc'))