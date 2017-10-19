export default (req, res) => {
	return res.render('dash/index', {
		title: 'Indexador de Vagas - Analises',
		user: req.user || undefined,
		layout: 'app'
	})
}