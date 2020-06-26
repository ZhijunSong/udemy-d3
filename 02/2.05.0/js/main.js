/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
var svg= d3.select("#chart-area")
	.append("svg")
	.attr("width",500)
	.attr("height",400)
var ellipse=svg.append("ellipse")
	.attr("cx",100)
	.attr("cy",200)
	.attr("rx",50)
	.attr("ry",70)
	.attr("fill","grey")
var line = svg.append("line")
	.attr("x1",10)
	.attr("y1",20)
	.attr("x2",109)
	.attr("y2",200)
	.attr("stroke","yellow")
	.attr("stroke-weight",5)

var rect = svg.append("rect")
	.attr("x",200)
	.attr("y",200)
	.attr("height", 100)
	.attr("width", 250)
	.attr("fill", "blue");