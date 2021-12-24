const mongoose = require('mongoose');

const DB =process.env.DATABASE;

mongoose.connect(DB) 
// {
//     useNewUrlParser:true,
//      useCreateIndex:true,     //it is used when there is showin a depricatedwarning message...
//     useUnifiedTopology:true,
//     useFindAndModify:false
//  })
.then(() => {
console.log('connection successful');
}).catch((err) => console.log('no connection'));