import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import hbs from'express-hbs'
import methodOverride from 'method-override'
import session from 'express-session'

module.exports = (app) => {
	app.set('port', 9000)
	app.set('views', path.join(__dirname, './../../views'))
	app.set('view engine', 'hbs')

	app.use(express.static(path.join(__dirname, './../../public')))
	app.use(morgan('dev'))
	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json())
	app.use(methodOverride('_method'))
	app.use(session({
		secret: '#!@*(&#*(@!&#DAHSJKJKD',
		resave: false,
		saveUninitialized: false
	}))

	app.engine('hbs', hbs.express4({
		defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
		partialsDir: path.join(app.get('views'), 'partials'),
		layoutsDir: path.join(app.get('views'), 'layouts')
	}))
}