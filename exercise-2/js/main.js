/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).
		The variable "data" is accessible to you, as you read it in from data.js
*/
$(function() {
	// Read in your data. On success, run the rest of your code
	d3.csv('data/prepped_data.csv', function(error, data){
	 	// Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
	 	var svg = d3.select('#vis').append('svg').attr('height', 600).attr('width', 600);

		// Margin: how much space to put in the SVG for axes/titles
		var margin = {
			left:70,
			bottom:100,
			top:50,
			right:50,
		};

		// Height/width of the drawing area for symbols
		var height = 600 - margin.bottom - margin.top;
		var width = 600 - margin.left - margin.right;

		// Append a 'g' element in which to place the circles, 
		// shifted down and right from the top left corner using the margin values

		// var axis = d3.svg.axis().scale(scale).orient('bottom');
		var myG = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
					.attr('height', height).attr('width', width);

		// Find minimum and maximum values, then define x (log) and y (linear) scales
		var minX = d3.min(data, function(d) {return +d.gdp});
		var maxX = d3.max(data, function(d) {return +d.gdp});

		var minY = d3.min(data, function(d) {return +d.life_expectancy});
		var maxY = d3.max(data, function(d) {return +d.life_expectancy});

		var xScale = d3.scale.log().domain([minX, maxX]).range([0, width]);
		var yScale = d3.scale.linear().domain([minY, maxY]).range([height, 0]);

		// Perform a data-join for your data, creating circle element in your chart `g`

		var circles = myG.selectAll('circle').data(data);
		// Select all circles and bind data


		// Use the .enter() method to get your entering elements, and assign initial positions
		circles.enter().append('circle')
						.attr('r', 10)
						.attr('fill', 'blue')
						.attr('cy', height)
						.style('opacity', 0.3)
						.attr('title', function(d) {return d.country});

		// Use the .exit() and .remove() methods to remove elements that are no longer in the data
		circles.exit().remove()

	  	// Transition properties of the update selection
		circles.transition().duration(1500)
							.attr('cx', function(d) {return xScale(d.gdp)})
							.attr('cy', function(d) {return yScale(d.life_expectancy)});

		// Define x axis using d3.svg.axis(), assigning the scale as the xScale
		var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(5, 's');

		// Define y axis using d3.svg.axis(), assigning the scale as the yScale
		var yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(d3.format('.2s'));

		// Append x axis to your SVG, specifying the 'transform' attribute to position it
		svg.append('g').attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')').attr('class', 'axis').call(xAxis);


		// Append y axis to your SVG, specifying the 'transform' attribute to position it
		svg.append('g').attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')').attr('class', 'axis').call(yAxis);


		// Append a text element to label your x axis, and position it appropriately
		svg.append('text')
			.attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
			.attr('class', 'title')
			.text('Gross Domestic Product in 2014 (2005 USD)');
		// Append a text element to label your y axis, and position it appropriately
		svg.append('text')
			.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
			.attr('class', 'title')
			.text('Life expectancy in 2014');

		/* Using jQuery, select all circles and apply a tooltip
		If you want to use bootstrap, here's a hint:
		http://stackoverflow.com/questions/14697232/how-do-i-show-a-bootstrap-tooltip-with-an-svg-object
		*/

		$("circle").tooltip({
			'container': 'body',
			'placement': 'bottom'
		});

	});
});
