const mongoose = require('mongoose')
// const connectDB = () => {
// 	return mongoose.connect('mongodb://127.0.0.1:27017/yash-api').then(() => {
// 		console.log('DB Connection Successfully')
// 	}).catch((err) => {
// 		console.log(err)
// 	})
// }
const connectDB = () => {
	return mongoose.connect('mongodb+srv://yash121bhatt:yash123@cluster0.nfxdvqy.mongodb.net/yash-api?retryWrites=true&w=majority').then(() => {
		console.log('DB Connection Successfully')
	}).catch((err) => {
		console.log(err)
	})
}
module.exports = connectDB