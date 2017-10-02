export default (req, res) => {
	return res.render('jobs/index', {
		title: 'Indexador de Vagas - Listagem',
		layout: 'app',
		user: req.user || undefined
	})
}