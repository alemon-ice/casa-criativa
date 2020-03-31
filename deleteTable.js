const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./maratonaDev.db')

db.serialize(function() {
    
    //deletar dado da tabela
    // TODO adicionar botão de deletar ao site
    db.run(`DELETE FROM ideas`, function(err) {
        if(err) return console.log(err)
        
        console.log('Ideia deletada', this);
    })
     
    //consultar dados na tabela
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if(err) return console.log(err)
        
        console.log(rows);
    })

})