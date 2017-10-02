export default (req, res) => {
	req.logout()

	return res.redirect('/')
}