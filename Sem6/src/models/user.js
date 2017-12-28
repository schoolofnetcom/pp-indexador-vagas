import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const User = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true
	},
	telephone: {
		type: String,
		required: true
	},
	password: {
		type: String
	}
})

User.plugin(passportLocalMongoose, { usernameField: 'email' })

export default mongoose.model('User', User)
