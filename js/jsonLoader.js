// no explicit edge direction
// edges undirected per default
var json = new $G.JsonInput(false, false);
// console.log(json);

function loadGraphFromJSON(file) {
  // clear memory
  delete window.graph;

  // console.log(file);
  var start = +new Date(),
      onload,
      end;

  var name = file.name.split(".");
  // console.log(name);

  // Only process JSON files.
  if (!name[name.length-1].match('json')) {
    throw new Error('Please choose a valid JSON file for graph input!')
  }

  var reader = new FileReader();

  reader.onload = function(event) {

    var onload = +new Date();
    var jsonText = event.target.result;
    var jsonGraph = JSON.parse(jsonText);
    window.graph = json.readFromJSON(jsonGraph);

    end = +new Date();

    console.log("Read graph with " + graph.nrNodes() + " nodes and " + graph.nrUndEdges() + " edges in " + (end-start) + " ms.");
    console.log("Pure GraphiniusJS readfromJSON time: " + (end-onload) + " ms");


    document.querySelector('#graph_info > .nr_nodes').innerHTML = graph.nrNodes();
    document.querySelector('#graph_info > .nr_edges').innerHTML = graph.nrUndEdges();
    document.querySelector('#graph_info > .time').innerHTML = (end-start) + " ms";
    document.querySelector('#graph_info > .deg_dist').innerHTML = "N/A";

    renderGraph();
  };

  // Read in the JSON file as TEXT.
  reader.readAsText(file);
}
