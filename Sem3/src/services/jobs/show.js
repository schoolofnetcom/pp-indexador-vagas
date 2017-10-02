export default (req, res) => {
	return res.render('jobs/show', {
		title: 'Indexador de vagas - Detalhe',
		layout: 'app',
		user: req.user || undefined
	})
}