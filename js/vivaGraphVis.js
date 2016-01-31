var vigraph;
var mut_count;

function renderGraphViva() {

  document.querySelector("svg#graphvis").style.display = "none";
  document.querySelector("#vivagraph-vis").style.display = "block";

  var edge,
      node_a_id,
      node_b_id;

  // console.log(window.graph.getStats());
  var nodes = window.graph.getNodes();
  var node_data = {
    color: "#901a43ff",
    shape: "circle"
  }
  var dir_edges = window.graph.getDirEdges();
  var und_edges = window.graph.getUndEdges();

  vigraph = Viva.Graph.graph();

  for (var node in nodes) {
    vigraph.addNode(node);
  }
  for (var u_edge in und_edges) {
    edge = und_edges[u_edge];
    node_a_id = edge._node_a.getID();
    node_b_id = edge._node_b.getID();
    vigraph.addLink(node_a_id, node_b_id);
  }
  for (var d_edge in dir_edges) {
    edge = dir_edges[d_edge];
    node_a_id = edge._node_a.getID();
    node_b_id = edge._node_b.getID();
    vigraph.addLink(node_a_id, node_b_id);
  }

  var graphics = Viva.Graph.View.webglGraphics();
  graphics.node(function(node) {
    return Viva.Graph.View.webglSquare(24, "#538effaf");
  });
  graphics.link(function(link) {
    return Viva.Graph.View.webglLine("#81cf287f");
  });

  var renderer = Viva.Graph.View.renderer(vigraph,
      {
          graphics : graphics,
          container : document.querySelector("#vivagraph-vis")
      });
  renderer.run();
}


function mutilateGraphViva() {
  var nr_nodes = window.graph.nrNodes(),
      node_keys = Object.keys(window.graph.getNodes()),
      key,
      count = mut_count;
      // console.log(count);
  if ( nr_nodes ) {
    while (count-- && nr_nodes--) {
      key = node_keys[nr_nodes];
      graph.deleteNode(graph.getNodeById(key));
      vigraph.removeNode(key);
    }
    console.log( graph.nrNodes() );

    requestAnimationFrame(mutilateGraphViva);
  }

}
