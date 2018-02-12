const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://@ds233748.mlab.com:33748/taysistakki'

mongoose.connect(url)

mongoose.Promise = global.Promise;

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })
