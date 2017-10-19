export default (req, res) => {
	if (!req.user) {
		return res.render('users/login', {
			title: 'Indexador de Vagas - Login',
			layout: 'login_register'
		})	
	}

	let { _id } = req.user
	return res.redirect('/users/'.concat(_id))
}