export default (req, res) => {
	return res.render('users/login', {
		title: 'Indexador de Vagas - Login',
		layout: 'login_register'
	})
}