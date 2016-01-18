var DOMAIN_WIDTH = 535,
    DOMAIN_HEIGHT = 525;


function loadGraphFromEdgeList(file, directed) {

  var csv = new $G.CsvInput(" ", false, directed);

  // clear memory
  delete window.graph;

  // TODO This hurts so much...
  resetSVG();

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

    // TODO Separate out to sane location...
    // get a sample & check if we have a graph without coordinates
    // then give some to them ;)
    if ( !graph.getRandomNode().getFeature('coords') ) {
      for ( node_key in graph.getNodes() ) {
        var c = {x: Math.random()*(DOMAIN_WIDTH-8), y: Math.random()*(DOMAIN_HEIGHT-8)};
        graph.getNodeById(node_key).setFeature('coords', c);
      }
    }

    end = +new Date();

    console.log("Read graph with " + graph.nrNodes() + " nodes, " + graph.nrUndEdges() + " undirected edges, " + graph.nrDirEdges() + " directed edges in " + (end-start) + " ms.");
    console.log("Pure GraphiniusJS readfromJSON time: " + (end-onload) + " ms");


    document.querySelector('#graph_info > .nr_nodes').innerHTML = graph.nrNodes();
    document.querySelector('#graph_info > .nr_und_edges').innerHTML = graph.nrUndEdges();
    document.querySelector('#graph_info > .nr_dir_edges').innerHTML = graph.nrDirEdges();
    document.querySelector('#graph_info > .time').innerHTML = (end-start) + " ms";

    renderGraph();

  };

  // Read in the JSON file as TEXT.
  reader.readAsText(file);
}
