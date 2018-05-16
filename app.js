var width = 800;
var height = 800;
var minYear = d3.min(birthData, d => d.year);
var maxYear = d3.max(birthData, d => d.year);
var orderedMonths = ["January", "February", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "December"];
var colorScale = d3.scaleOrdinal()
                    .domain(orderedMonths)
                    .range(d3.schemeCategory20);

var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

svg
    .append("g")
        .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
        .classed("chart", true);

svg
    .append("text")
        .classed("title", true)
        .attr("x", width / 2)
        .attr("y", 30)
        .style("font-size", "2em")
        .style("text-anchor", "middle");

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear)
    .on("input", () => drawGraph(+d3.event.target.value));

drawGraph(minYear);

function drawGraph(year) {
    var yearData = birthData.filter(d => d.year === year);
    var arcs = d3.pie()
                .value(d => d.births)
                .sort((a, b) => orderedMonths.indexOf(a.month) - orderedMonths.indexOf(b.month))

    var path = d3.arc()
                .innerRadius(width / 4)
                .outerRadius(width / 2 - 40);

    var outer = d3.select(".chart")
                    .selectAll(".arc")
                    .data(arcs(yearData));

    outer   
        .enter()
        .append("path")
            .classed("arc", true)
            .attr("fill", d => colorScale(d.data.month))
        .merge(outer)
            .attr("d", path);
    
    d3.select(".title")
        .text("Births by month and quarter for " + year);
                    

}
