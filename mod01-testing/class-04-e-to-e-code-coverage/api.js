const http = require('http')

const routes = {
    '/contact:get': (req, res) => {
        res.write('contact us page')
        return res.end()
    },
    default: (req, res) => {
        res.write('Hello World!')
        return res.end()
    }
}

const handler = function (request, response) {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('app running at', 3000))

module.exports = app