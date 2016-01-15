// MEASURING TIME
var init = +new Date(),
    start,
    end;

var DOMAIN_WIDTH  = 535,
    DOMAIN_HEIGHT = 525,
    WIDTH         = 1000,
    HEIGHT        = 800,
    RADIUS        = 4,
    STROKE        = '#901A43',
    STROKE_WIDTH  = 2,
    FILL          = 'transparent';


var scale_x = d3.scale.linear()
            .domain([-8, DOMAIN_WIDTH])  // Data space
            .range([0, WIDTH]); // Pixel space

var scale_y = d3.scale.linear()
            .domain([-8, DOMAIN_HEIGHT])  // Data space
            .range([0, HEIGHT]); // Pixel space

var svg = d3.select("svg")
            .attr('width', WIDTH)
            .attr('height', HEIGHT);


// but we need an array for D3.js
function renderGraph() {
  start = +new Date();

  if ( !window.node_obj || !window.node_keys) {
    // Object
    window.nodes_obj = window.graph.getNodes();
    window.node_keys = Object.keys(nodes_obj);
  }

  // Select elements
  var elements = svg.selectAll("circle");
  // Bind data to elements
  var nodes = elements.data(node_keys);
  // console.log(nodes);

  // Enter
  nodes.enter().append("circle")
    .attr("cx", function(key) { return scale_x(nodes_obj[key].getFeature('coords').x) })
    .attr("cy", function(key) { return scale_y(nodes_obj[key].getFeature('coords').y) })
    .attr("r", RADIUS)
    .attr("stroke", STROKE)
    .attr("stroke-width", STROKE_WIDTH)
    .attr("fill", FILL)
    .attr("class", "node");

  // nodes
    // .attr("cx", function(key) { return scale_x(nodes_obj[key].getFeature('coords').x) })
    // .attr("cy", function(key) { return scale_y(nodes_obj[key].getFeature('coords').y) })
  //   .attr("r", 4)
  //   .attr("stroke", '#A00000')
  //   .attr("stroke-width", 2)
  //   .attr("fill", 'white');

  nodes.exit().remove();

  end = +new Date();
  console.log("Rendered graph in " + (end-start) + " ms.");
  // window.requestAnimationFrame(renderGraph);
}


function mutilateGraphSingle() {
  renderGraph();
  var nr_nodes = graph.nrNodes();
  if ( nr_nodes-- ) {
    graph.removeNode(graph.getNodeById(node_keys[nr_nodes]));
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraphSingle);
  }
}


function mutilateGraph50() {
  renderGraph();
  var nr_nodes = graph.nrNodes(),
      count = 50;
  if ( nr_nodes ) {
    while (count-- && nr_nodes--) {
      graph.removeNode(graph.getNodeById(node_keys[nr_nodes]));
    }
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraph50);
  }
}


function mutilateGraph500() {
  renderGraph();
  var nr_nodes = graph.nrNodes(),
      count = 500;
  if ( nr_nodes ) {
    while (count-- && nr_nodes--) {
      graph.removeNode(graph.getNodeById(node_keys[nr_nodes]));
    }
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraph500);
  }
}


function mutilateGraphTime() {
  var start = +new Date();
  renderGraph();
  var nr_nodes = graph.nrNodes();
  if ( nr_nodes ) {
    while (nr_nodes-- && (+new Date() - start) < 16 ) {
      graph.removeNode(graph.getNodeById(node_keys[nr_nodes]));
    }
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraphTime);
  }
}
