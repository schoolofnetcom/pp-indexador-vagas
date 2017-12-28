import request from 'request-promise'
import cheerio from 'cheerio'
import Job from './../../models/job'
import _ from 'lodash'
import Promises from 'bluebird'
import moment from 'moment'

export default async (req, res) => {

	let $ = undefined
	
	const withOptions = page => ({ 
		method: 'GET', 
		url: !page ? `https://radartec.com.br/pesquisar/vaga?q=&cidades=&salario=&quantidade=100&ordem=0` : `https://radartec.com.br/pesquisar/vaga?q=&cidades=&salario=&quantidade=100&ordem=0&page=${page}`,
		transform: function(body) { return $ = cheerio.load(body) }
	})

	let bodyPages = await request(withOptions())
	$ = cheerio.load(bodyPages.html())

	let cacheData = await Job.find({}).sort({ 'date': 'desc' })
	if (cacheData && cacheData.length > 0) { 
		let lastUpdated = cacheData[0].date
		let lastUpdateInSite = moment($('.vote-item:first-child .info-data > p').text().trim(), 'DD/MM/YYYY')
		let needUpdate = moment(lastUpdated).isBefore(lastUpdateInSite)
	
		if (!needUpdate) {
			return res.render('jobs/index', {
				title: 'Indexador de Vagas - Listagem',
				layout: 'app',
				user: req.user || undefined,
				data: cacheData
			})		
		}
	}

	let pages = []

	pages = $('.pagination > li:not([class^="disabled"]) > a:not([rel])').map(function() {
		return parseInt($(this).text())
	}).get().slice(-1).pop()

	pages = _.range(1, pages + 1, 1)
	let data = []

	Promises
		.each(pages, async (page) => {
			let body = await request(withOptions(page))
			$ = cheerio.load(body.html())

			return Promises
				.all(Promises
					.each($('.vote-item').get(), async function(element) {
						let row = $(element) // $(this)
						let job_id = row.find('.vote-title').attr('href').match(/\/(\d+)\//)[1]
						let existsInDB = await Job.findOne({ job_id })

						if (!existsInDB) {
							const toInsert = {
								title  : row.find('.vote-title').text().trim().replace(/\r?\n|\r/, ' '),
								url    : row.find('.vote-title').attr('href'),
								empresa: row.find('.empresa').text().trim(),
								salario: row.find('.salario').text().trim(),
								desc   : row.find('.vote-info > p').text(),
								date   : moment(row.find('.info-data > p').text().trim(), 'DD/MM/YYYY'),
								job_id
							}
							data.push(toInsert)
						}
					})
				)
		})
		.then(async () => {
			if (data.length) await Job.insertMany(data)

			data = await Job.find({}).sort({ 'date': 'desc' })

			return res.render('jobs/index', {
				title: 'Indexador de Vagas - Listagem',
				layout: 'app',
				user: req.user || undefined,
				data
			})
		})
}
