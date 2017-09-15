import User from './../../models/user'

export default (req, res) => {	
	let { username, email, telephone } = req.body
	let data = { username, email, telephone }

	User
		.register(data, req.body.password, (error, user) => {
			if (error) {
				return res.status(500).send(error)
			}

			return res.redirect('/')
		})
}