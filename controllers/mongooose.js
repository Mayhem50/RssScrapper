const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:92KtdmTrCkBhURj@cluster0-l5ywu.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true})
        .then(val => console.log('Connection success'))
        .catch(err => {
            console.log(err);
        });
