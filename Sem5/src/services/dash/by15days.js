import Job from './../../models/job'
import moment from 'moment'

export default (req, res) => {
	const options = [{
		$match: {
			'date': {
				'$gte': new Date(moment().subtract(15, 'days')),
				'$lt': new Date()
			}
		}
	},{
		$group: {
			_id: '$date',
			count: { $sum: 1 }
		}
	}]

	Job
		.aggregate(options)
		.sort({ 'title': 'desc' })
		.then((result) => {
			let labels = result.map(item => moment(item._id).format('DD/MM/YYYY'))
			let data   = result.map(item => item.count) 

			return res.json({ labels, datasets: [{ data }] })
		})
}