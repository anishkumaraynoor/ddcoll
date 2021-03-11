const mongoClient = require('mongodb').MongoClient;
const state = {
    db:null
}



module.exports.connect = function(done){
    const url = 'mongodb+srv://ddcolledn:f9g5cf3MAP7SPW2b@ddcolledn.b4kyf.mongodb.net/collegiate?retryWrites=true&w=majority'
    const dbname = 'collegiate'
    
    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)
        state.db = data.db(dbname)
        done()
    })
    
}
module.exports.get = function(){
    return state.db
}
