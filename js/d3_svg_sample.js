// MEASURING TIME
var init = +new Date(),
    start,
    end,
    coords,
    node_idx,
    elements,
    svg;

var DOMAIN_WIDTH  = 535,
    DOMAIN_HEIGHT = 525,
    WIDTH         = 1000,
    HEIGHT        = 800,
    RADIUS        = 4,
    RADIUS_ACTIVE = 10;

var scale_x = d3.scale.linear()
            .domain([-8, DOMAIN_WIDTH])  // Data space
            .range([0, WIDTH]); // Pixel space

var scale_y = d3.scale.linear()
            .domain([-8, DOMAIN_HEIGHT])  // Data space
            .range([0, HEIGHT]); // Pixel space

svg = d3.select("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);


function renderGraph() {

  // TODO Separate out initialization phase...
  if ( !window.node_obj || !window.node_keys) {
    // Object
    window.nodes_obj = window.graph.getNodes();
    window.node_keys = Object.keys(window.nodes_obj);
    window.und_edges = window.graph.getUndEdges();
    window.und_edges_keys = Object.keys(window.und_edges);
  }

  start = +new Date();

  svg = d3.select("svg")
              .attr('width', WIDTH)
              .attr('height', HEIGHT);


  //-------------------------------------------------------
  //                       UNDIRECTED EDGES
  //-------------------------------------------------------

  elements = svg.selectAll("line");
  var u_edges = elements.data(und_edges_keys);

  u_edges.enter().append("line")
                 .attr("x1", function(key) { return getXCoord(und_edges[key]._node_a._id) })
                 .attr("y1", function(key) { return getYCoord(und_edges[key]._node_a._id) })
                 .attr("x2", function(key) { return getXCoord(und_edges[key]._node_b._id) })
                 .attr("y2", function(key) { return getYCoord(und_edges[key]._node_b._id) })
                 .attr("class", "u_edge");

  u_edges.exit().remove();


  //-------------------------------------------------------
  //                       NODES
  //-------------------------------------------------------
  // Select elements
  elements = svg.selectAll("circle");

  // Bind data to elements
  var nodes = elements.data(node_keys);
  // console.log(nodes);

  // ENTER PHASE
  nodes.enter().append("circle")
    .attr("cx", function(key) { return getXCoord(key) })
    .attr("cy", function(key) { return getYCoord(key) })
    .attr("r", RADIUS)
    .attr("id", function(key) { return "node-" + key })
    .attr("class", "node")
    .on('mouseover', node_mouseover)
    .on('mouseout', node_mouseout)
    .on('click', node_click);

  // NO UPDATE PHASE => TOO SLOW !!

  // EXIT PHASE
  nodes.exit().remove();

  end = +new Date();
  console.log("Rendered graph in " + (end-start) + " ms.");
  // window.requestAnimationFrame(renderGraph);
}




d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function node_click() {
  var id = this.id.split("-")[1];
  console.log("Clicked node " + id);
  var node = d3.select(this);
  var active = !node.classed('active');
  var r = active ? RADIUS_ACTIVE : RADIUS;
  node
    .moveToFront()
    .attr("r", r)
    .classed('active', active);

  if( active ) {
    var info_box = document.getElementById('info-box');
    info_box.style.right = "0px";
    // Show info in info box
    var info = "<h4> Node info: </h4>";
    info += "ID: " + id + "</br>";

    info_box.innerHTML = info;
  }
  else {
    // check if other nodes are active etc....
  }
}

function node_mouseover() {
  d3.select(this).moveToFront().attr("r", RADIUS_ACTIVE);
}

function node_mouseout() {
  var node = d3.select(this);
  if ( !node.classed('active') ) {
    d3.select(this).attr("r", RADIUS);
  }
}

function getXCoord(key) {
  return ~~scale_x(nodes_obj[key].getFeature('coords').x);
}

function getYCoord(key) {
  return ~~scale_y(nodes_obj[key].getFeature('coords').y);
}

function toggleInfoBox() {
  var info_box = document.getElementById('info-box');
  var right = window.getComputedStyle(info_box).getPropertyValue('right').match(/\d+/g)[0];
  console.log(right);

  info_box.style.right = right > 0 ? "0px" : "-316px";
}


function resetSVG() {
  d3.select("svg").remove();
  d3.select("body")
    .append("svg")
    .attr("id", "graphvis");
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
  renderGraph();
  var start = +new Date();
  var nr_nodes = graph.nrNodes();
  if ( nr_nodes ) {
    while (nr_nodes-- && (+new Date() - start) < 16 ) {
      graph.removeNode(graph.getNodeById(node_keys[nr_nodes]));
    }
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraphTime);
  }
}
