const mongooes = require('mongoose');
const connectDatabase = () =>{  
    
    console.log('connecting to database ....');
    mongooes.connect(`mongodb://${process.env.dbURL}`).then((data)=>{
    console.log(`database connected to server with data ${data.connection.host}`);
})
};
module.exports = connectDatabase;