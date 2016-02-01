// MEASURING TIME
var init = +new Date(),
    start,
    end,
    coords,
    node_idx,
    elements,
    svg,
    svg_container,
    nodes_obj,
    node_keys,
    und_edges,
    und_edges_keys,
    dir_edges,
    dir_edges_keys;

var DOMAIN_WIDTH  = 535,
    DOMAIN_HEIGHT = 525,
    WIDTH         = 1000,
    HEIGHT        = 800,
    RADIUS        = 3,
    RADIUS_ACTIVE = 10;

var scale_x = d3.scale.linear()
            .domain([-8, DOMAIN_WIDTH])  // Data space
            .range([0, WIDTH]); // Pixel space

var scale_y = d3.scale.linear()
            .domain([-8, DOMAIN_HEIGHT])  // Data space
            .range([0, HEIGHT]); // Pixel space

// svg_container = d3.select("svg")
//         .attr('width', WIDTH)
//         .attr('height', HEIGHT);
//
// svg = svg_container.append("g")
//                    .attr("class", "svg-pan-zoom_viewport");

function renderGraph() {

  nodes_obj = graph.getNodes();
  node_keys = Object.keys(nodes_obj);
  und_edges = graph.getUndEdges();
  und_edges_keys = Object.keys(und_edges);
  dir_edges = graph.getDirEdges();
  dir_edges_keys = Object.keys(dir_edges);

  start = +new Date();

  svg = d3.select("svg#graphvis").select("g.svg-pan-zoom_viewport")
          .attr('width', WIDTH)
          .attr('height', HEIGHT);

  svg.append("defs").append("marker")
                    .attr("id", "marker_d_edge")
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 18)
                    .attr("refY", 0)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .attr("class", "marker_d_edge")
                    .append("path")
                      .attr("d", "M0, -5L10, 0L0, 5");


  //-------------------------------------------------------
  //                       UNDIRECTED EDGES
  //-------------------------------------------------------

  elements = svg.selectAll("path.u_edge");
  var u_edges = elements.data(und_edges_keys);

  u_edges.enter().append("path")
                 .attr("d", function(key) { return buildEdgePath(und_edges, key) })
                 .attr("class", "u_edge");

  u_edges
    .attr("d", function(key) { return buildEdgePath(und_edges, key) })
    .attr("class", "u_edge");


  u_edges.exit().remove();


  //-------------------------------------------------------
  //                       DIRECTED EDGES
  //-------------------------------------------------------

  elements = svg.selectAll("path.d_edge");
  var d_edges = elements.data(dir_edges_keys);

  d_edges.enter().append("path")
                 .attr("d", function(key) { return buildEdgePath(dir_edges, key) })
                 .attr("marker-end", "url(#marker_d_edge)")
                 .attr("class", "d_edge");

   d_edges
      .attr("d", function(key) { return buildEdgePath(dir_edges, key) })
      .attr("marker-end", "url(#marker_d_edge)")
      .attr("class", "d_edge");

  d_edges.exit().remove();


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

  initSVGPanZoom();

  end = +new Date();
  console.log("Rendered graph in " + (end-start) + " ms.");
  // window.requestAnimationFrame(renderGraph);
}


function buildEdgePath(edges, key) {
  var d = "M ";
  d += getXCoord(edges[key]._node_a._id) + " ";
  d += getYCoord(edges[key]._node_a._id) + " ";
  d += "L ";
  d += getXCoord(edges[key]._node_b._id) + " ";
  d += getYCoord(edges[key]._node_b._id) + " ";
  return d;
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
    // info_box.style.right = "0px";
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


function resetSVG() {
  d3.select("svg").remove();
  d3.select("body")
    .append("svg")
    .attr("id", "graphvis");
  initSVGPanZoom();
}


function mutilateGraphD3(count) {
  renderGraph();
  var nr_nodes = graph.nrNodes(),
      count = 50;
  if ( nr_nodes ) {
    while (count-- && nr_nodes--) {
      graph.deleteNode(graph.getNodeById(node_keys[nr_nodes]));
    }
    console.log( graph.nrNodes() );
    requestAnimationFrame(mutilateGraphD3);
  }
}
