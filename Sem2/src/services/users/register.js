export default (req, res) => {
	return res.render('users/register', {
		title: 'Indexador de Vagas - Novo Usuário',
		layout: 'login_register'
	})
}