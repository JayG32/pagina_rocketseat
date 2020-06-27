const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const paginas = require("./data")

server.use(express.static("public"))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true
})


// rotas
server.get("/", function (req, res) {
    server.use(function(req, res) {
        res.status(404).render("not-found")
    })

    const sobre = {
        avatar: "img/logo1.png",
        nome: '<a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        descricao:"O objetivo da comunidade é ajudar a elevar o nível de cada profissional, seja em aspectos técnicos ou não, partindo do princípio de que compartilhar as experiências é a melhor forma de acelerar sua evolução como programador." ,
        titulo: "Principais tecnologias: ",
        links_tecnologias: [
            {nome: "Javascript", tec_avatar: "img/js.png", url:"https://www.w3schools.com/js/"},
            {nome: "HTML", tec_avatar: "img/html.png", url:"https://www.w3schools.com/html/"},
            {nome: "CSS", tec_avatar: "img/css.png", url:"https://www.w3schools.com/css/default.asp"},
            {nome: "Node.js", tec_avatar: "img/node.png", url:"https://nodejs.org/en/"},
            {nome: "React", tec_avatar: "img/react.png", url:"https://pt-br.reactjs.org/"}
        ]
    }

    return res.render("sobre", {sobre})
})

server.get("/conteudos", function (req, res) {
    server.use(function(req, res) {
        res.status(404).render("not-found")
    })
  return res.render("conteudos", {items: paginas})  
})

server.get("/pagina", function (req, res) {
    server.use(function(req, res) {
        res.status(404).render("not-found")
    })  
    const id = req.query.id

    const pagina = paginas.find(function (pagina) {
        return pagina.id == id
    })

    if (!pagina) {
        return res.render("not-found")
    }

    return res.render("pagina", {item: pagina})
})


server.listen(5000, function () {
    console.log("O servidor está executando!")
})