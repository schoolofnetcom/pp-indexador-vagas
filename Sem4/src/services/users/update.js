import User from './../../models/user'

export default (req, res) => {
	let { email, telephone, password } = req.body
	let data = { email, telephone }

	User
		.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send('Not found')
			}

			if (!password) {
				return User
						.findByIdAndUpdate(req.params.id, data)
						.then(user => res.redirect('/users/'.concat(user._id)))			
			}

			return user.setPassword(password, (error, updated, passErr) => {
				if (error || passErr) {
					return;
				}

				updated.save()

				User
					.findByIdAndUpdate(req.params.id, data)
					.then(user => res.redirect('/users/'.concat(user._id)))
			})
		})
}