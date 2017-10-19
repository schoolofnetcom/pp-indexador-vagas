import mongoose from 'mongoose'

const Job = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	desc_full: {
		type: String
	},	
	job_id: {
		type: mongoose.SchemaTypes.Mixed
	},
	date: {
		type: Date
	}
})

export default mongoose.model('Job', Job)