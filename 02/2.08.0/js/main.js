/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!

*/
var svg= d3.select("#chart-area")
	.append("svg")
	.attr("width",500)
	.attr("height",500);

d3.json("data/buildings.json").then(function(data){
	console.log(data);

	data.forEach(function(d){
		d.height =+d.height;

	});

	var rects = svg.selectAll("rect")
		.data(data)
		//parse result of data to enter
		//parse the result data to svg
		.enter().append("rect")
			.attr("x",function(d,i){
				return(i*60)
			})
			.attr("y",0)
			.attr("height",function(d,i){
				return d.height

			})
			.attr("width",30)
			.attr("fill","grey");
});