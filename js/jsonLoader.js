var DOMAIN_WIDTH = 535,
    DOMAIN_HEIGHT = 525;


function loadGraphFromJSON(file, directed) {

  var json = new $G.JsonInput(false, directed);

  // clear memory
  delete window.graph;

  // TODO This hurts so much...
  resetSVG();

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
  };

  // Read in the JSON file as TEXT.
  reader.readAsText(file);
}
