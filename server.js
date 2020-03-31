// utilizado o Express criar e configurar o servidor
const express = require("express")
const server = express()
const db = require("./db")

// configurar arquivos estáticos
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

// configuração do nunjucks
const nunjucks =require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

// rota "/"
server.get("/", function (req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err);
            return res.send("Erro no BD!")
        }
        
        const reversedIdeas = [...rows].reverse()
        
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", { ideas: lastIdeas })
    })
})

// rota "/ideias"
server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) {
            console.log(err);
            return res.send("Erro no BD!")
        }
        
        const reversedIdeas = [...rows].reverse()
        
        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function(req, res) {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
        ) VALUES(?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    
    db.run(query, values, function(err) {
        if(err) {
            console.log(err);
            return res.send("Erro no BD!")
        }
        
        return res.redirect("/ideias")
    })
})

// servidor ligado na porta 3000
server.listen(3000)