/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/
var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var time = 0;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//transitions


//x scale
var x = d3.scaleLog()
    .base(10)
    .range([0, width])
    .domain([300, 150000]);
 //y scale
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 90]);

var area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([2000, 1400000000]);

var xAxisCall = d3.axisBottom(x)
    .tickValues([400, 4000, 40000])
    .tickFormat(d3.format("$"));

    // Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return +d });

var xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

var yAxisGroup = g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);
  

var continentColor = d3.scaleOrdinal(d3.schemePastel1);


// X Label
var xLabel = g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capital ($)");

// Y Label
var yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy (Years)");
//time label
var timeLabel = g.append("text")
    .attr("y", height -10)
    .attr("x", width - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");



d3.json("data/data.json").then(function(data){
	console.log(data);

	const formattedData = data.map(function(year){
	    return year["countries"].filter(function(country){
	        var dataExists = (country.income && country.life_exp);
	        return dataExists
	    }).map(function(country){
	        country.income = +country.income;
	        country.life_exp = +country.life_exp;
	        return country;            
	    })
	});


	d3.interval(function(){
		time =(time < 214) ? time+1 : 0
        update(formattedData[time]); 

	},100);

	update(formattedData[0]);

}) 

function update(data){
	// x.domain(data.map(function(d){ return d.income;}));
 //    y.domain([0, d3.max(data, function(d) { return d.life_exp; })]);
 	var t = d3.transition()
        .duration(100);
    var circles=g.selectAll("circle")
    	.data(data,function(d){ return d.country});

    circles.exit()
    	.attr("class","exit")
        .remove();

    circles.enter()
    	.append("circle")
    	.attr("class", "enter")
    	.attr("fill",function(d){return continentColor(d.continent);})
    	.merge(circles)
    	.transition(t)
    		.attr("cx",function(d){ return x(d.income);})
    		.attr("cy",function(d){return y(d.life_exp);})
    		.attr("r",function(d){return Math.sqrt(area(d.population) / Math.PI)});

     timeLabel.text(+(time + 1800));

}
