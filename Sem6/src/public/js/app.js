$(document).ready(function() {
	var contextByDays = document.getElementById('bydate').getContext('2d')
	var contextBy15Days = document.getElementById('by15days').getContext('2d')
	
	$.get('http://localhost:3000/dash/by-days').done(function(result) {
		var chart = new Chart(contextByDays, {
			type: 'bar',
			data: {
				datasets: result.datasets,
				labels: result.labels
			},
			options: {}
		})
	})

	$.get('http://localhost:3000/dash/by-15-days').done(function(result) {
		var chart = new Chart(contextBy15Days, {
			type: 'pie',
			data: {
				datasets: result.datasets,
				labels: result.labels
			},
			options: {}
		})
	})
})
