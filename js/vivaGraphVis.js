var vigraph,
    mut_count = 100,
    node_color = "#538eff80",
    edge_color = "#81cf287f",
    rand_color = false,
    cur_color;

function renderGraphViva() {
  document.querySelector("svg#graphvis").style.display = "none";
  document.querySelector("#vivagraph-vis").style.display = "block";

  if (vigraph) {
    vigraph.clear();
  }
  vigraph = Viva.Graph.graph();
  var graphics = Viva.Graph.View.webglGraphics();

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

  for (var node in nodes) {
    graphics.node(function(node) {
      cur_color = window.rand_color ? getRandomHexColor() : node_color;
      return Viva.Graph.View.webglSquare(24, cur_color);
    });
    vigraph.addNode(node);
  }
  for (var u_edge in und_edges) {
    edge = und_edges[u_edge];
    node_a_id = edge._node_a.getID();
    node_b_id = edge._node_b.getID();
    graphics.link(function(link) {
      cur_color = window.rand_color ? getRandomHexColor() : edge_color;
      return Viva.Graph.View.webglLine(cur_color);
    });
    vigraph.addLink(node_a_id, node_b_id);
  }
  for (var d_edge in dir_edges) {
    edge = dir_edges[d_edge];
    node_a_id = edge._node_a.getID();
    node_b_id = edge._node_b.getID();
    graphics.link(function(link) {
      cur_color = window.rand_color ? getRandomHexColor() : edge_color;
      return Viva.Graph.View.webglLine(cur_color);
    });
    vigraph.addLink(node_a_id, node_b_id);
  }

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

      // update UI
      document.querySelector('#graph_info > .nr_nodes').innerHTML = graph.nrNodes();
      document.querySelector('#graph_info > .nr_und_edges').innerHTML = graph.nrUndEdges();
      document.querySelector('#graph_info > .nr_dir_edges').innerHTML = graph.nrDirEdges();

      vigraph.removeNode(key);
    }
    console.log( graph.nrNodes() );

    requestAnimationFrame(mutilateGraphViva);
  }

}


function getRandomHexColor() {
  return "#00000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}
