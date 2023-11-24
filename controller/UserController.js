const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
var cloudinary = require('cloudinary').v2;
// -----------------------------------------

cloudinary.config({
	cloud_name: 'dqpruenbu',
	api_key: '647729552238854',
	api_secret: 'e-_ZXBG9zVQyhVTTGYNHg6iWv8s'
})

class UserController {
	static getAllData = async (req, res) => {
		try {
			res.json({
				status: true,
				message: 'Data successfully fetch',
				data: {}
			})
		} catch (error) {
			res.json({
				status: false,
				message: 'Internal server error',
				data: {}
			})
		}
	}

	static userInsert = async (req, res) => {
		try {
			const file = req.files.image
			const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
				folder: 'profileImageapi'
			})
			const { name, email, pass, cpass } = req.body
			const user = await UserModel.findOne({ email: email })
			console.log(user);
			if (user) {
				res.status(401).json({ status: "faild", message: "THIS EMAIL IS ALREADY EXTS" })
			} else {
				if (name && email && pass && cpass) {
					if (pass == cpass) {
						// console.log('pass, cpass');
						const Hashpassword = await bcrypt.hash(pass, 10)
						const result = new UserModel({
							name: name,
							email: email,
							password: Hashpassword,
							image: {
								public_id: imageUpload.public_id,
								url: imageUpload.secure_url
							}
							// ConfirmPassword: cpass,

						})
						await result.save()
						res.status(201).json({ status: "success", message: "Registration Successfully" })
					} else {
						res.status(401).json({ status: "faild", message: "PASSWORD AND CONFIRM PASSWERD DOES NOT MATCH" })
					}
				} else {
					res.status(401).json({ status: "faild", message: "ALL FIELD ARE REQUIRED" })
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	static pageNotFound = async (req, res) => {
		try {
			res.json({
				status: true,
				message: 'Page not found',
				data: {}
			})
		} catch (error) {
			res.json({
				status: false,
				message: 'Internal server error',
				data: {}
			})
		}
	}
}
module.exports = UserController