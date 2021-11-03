function getLayout(body, title, database){
    return `<html>
    <head>
        <title>${title}</title>
    </head>
    <body>
        <nav style="font-size: 36px">
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>
            <a href="/about">About</a>
        </nav>
        <div>
            ${body}
        </div>
    </body>
    </html>`
}

module.exports = {getLayout};