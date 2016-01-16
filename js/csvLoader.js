// no explicit edge direction
// edges undirected per default
var csv = new $G.CsvInput(" ", false, false);
// console.log(csv);

function loadGraphFromEdgeList(file) {
  // clear memory
  delete window.graph;

  // console.log(file);
  var start = +new Date(),
      end;

  var name = file.name.split(".");
  // console.log(name);

  // Only process CSV files.
  if (!name[name.length-1].match('csv')) {
    throw new Error('Please choose a valid CSV file for graph input!')
  }

  var reader = new FileReader();

  reader.onload = function(event) {
    var csvText = event.target.result;
    // console.log(csvText);

    var csvGraph = csvText.toString().split('\n');
    // console.log(csvGraph);

    window.graph = csv.readFromEdgeList(csvGraph, file.name);

    end = +new Date();

    console.log("Read graph with " + graph.nrNodes() + " nodes and " + graph.nrUndEdges() + " edges in " + (end-start) + " ms.");


    document.querySelector('#graph_info > .nr_nodes').innerHTML = graph.nrNodes();
    document.querySelector('#graph_info > .nr_edges').innerHTML = graph.nrUndEdges();
    document.querySelector('#graph_info > .time').innerHTML = end-start + " ms";
    document.querySelector('#graph_info > .deg_dist').innerHTML = "N/A";

  };

  // Read in the JSON file as TEXT.
  reader.readAsText(file);
}
