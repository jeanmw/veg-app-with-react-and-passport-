function index(req,res) {
    res.json({
        message: 'Welcome to Veggie Auth',
        collaborators: 'Jean W',
        documentation_url:'https://github.com/jeanmw/veg-auth-crud',
        base_url: 'localhost:3000',
        endpoint: [
            {
            method: 'GET',
            path: '/api',
            description: 'shows all avaliable routes as JSON'
            }
        ]
    });
}

module.exports = {
  index: index
}
