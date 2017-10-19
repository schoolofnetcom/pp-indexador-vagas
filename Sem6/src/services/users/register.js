export default (req, res) => {
	if (!req.user) {
		return res.render('users/register', {
			title: 'Indexador de Vagas - Novo Usuário',
			layout: 'login_register'
		})	
	}

	let { _id } = req.user
	return res.redirect('/users/'.concat(_id))
}