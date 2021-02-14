const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb://jose_mi19:${password}@databasecluster-shard-00-00.cln3b.mongodb.net:27017,databasecluster-shard-00-01.cln3b.mongodb.net:27017,databasecluster-shard-00-02.cln3b.mongodb.net:27017/phonebook?ssl=true&replicaSet=DatabaseCluster-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  pnumber: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {

  Person.find({}).then( result =>{
                console.log("phonebook:")
            result.forEach(person => {              
                 console.log(`${person.name} ${person.pnumber}`)
             })
             mongoose.connection.close()
   })  
    
  }

 else { 
    const person = new Person({
        name: process.argv[3],
        pnumber: process.argv[4] || 'Not available'
    })

    person.save().then(result => {
    console.log(`Added ${person.name} number ${person.pnumber} to phonebook`)
    mongoose.connection.close()
    })

 }