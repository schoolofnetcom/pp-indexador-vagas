module.exports = (app) => {
	app.use('/', require('./landing/'))
	app.use('/users', require('./users/'))
	app.use('/jobs', require('./jobs/'))
	app.use('/dash', require('./dash/'))
}