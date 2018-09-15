const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'mysql07-farm76.kinghost.net',
      user : 'bairrista',
      password : 'Eixk6DVH7',
      database : 'bairrista'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


server.listen(21123, function () {
  console.log('%s listening at %s', server.name, server.url);
});

//rotas REST

server.get('/', (req, res, next) => {
    knex('rest').then((dados) => {
        res.send(dados);    
    },next)

  });
  
  server.post('/create', (req, res, next) => {
    knex('rest')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);    
    },next)

  });