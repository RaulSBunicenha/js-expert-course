const http = require('http')
const DEFAULT_USER = { username: 'raul', password: 'raul' }

const routes = {
    '/contact:get': (req, res) => {
        res.write('contact us page')
        return res.end()
    },
    '/login:post': async (req, res) => {
        for await (const data of req) {
            const user = JSON.parse(data)
            
            if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
                res.writeHead(401)
                res.write('Logging failed!')
            } else {
                res.write('Loggin has succeeded!')
            }
        }
        
        return res.end()
    },
    default: (req, res) => {
        res.write('Hello World!')
        return res.end()
    }
}

const handler = async function (request, response) {
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