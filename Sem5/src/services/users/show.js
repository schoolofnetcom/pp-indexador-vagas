import User from './../../models/user'

export default (req, res) => {
	User
		.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send('Not found')
			}

			return res.render('users/show', {
				title: 'Indexador de vagas - Perfil',
				user,
				layout: 'app'
			})
		})
		.catch(error => res.status(500).send(error))
}