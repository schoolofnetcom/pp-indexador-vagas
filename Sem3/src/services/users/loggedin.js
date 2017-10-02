export default (req, res, next) => {
	if (req.user) {
		return next()
	}

	return res.redirect(req.query.next || '/')
}