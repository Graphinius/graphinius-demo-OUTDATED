function updateEdgeProbInfo() {
  var val = document.querySelector("#edgeProbRange").value;
  document.querySelector("#edge_addition_prob").innerHTML = val;
}

function createRandomEdgesProb(directed) {
  directed = directed || false;
  var val = +document.querySelector("#edgeProbRange").value;
  console.log("Creating random graph with edge probability: " + val);
  graph.clearAllEdges();
  graph.createRandomEdgesProb(val, directed);
  renderGraph();
}

function createDirEdgesProb() {
  createRandomEdgesProb(true);
}

function createUndEdgesProb() {
  createRandomEdgesProb(false);
}


function createRandomEdgesSpan(directed) {
  directed = directed || false;
  var min = +document.querySelector("#min_edge_deg").value || 0;
  var max = +document.querySelector("#max_edge_deg").value || 0;
  console.log("Creating random graph with min: " + min + " and max: " + max + " node degree");
  graph.clearAllEdges();
  graph.createRandomEdgesSpan(min, max, directed);
  renderGraph();
}

function createDirEdgesSpan() {
  createRandomEdgesSpan(true);
}

function createUndEdgesSpan() {
  createRandomEdgesSpan(false);
}

function toggleInfoBox() {
  var info_box = document.getElementById('info-box');
  var right = window.getComputedStyle(info_box).getPropertyValue('right').match(/\d+/g)[0];
  console.log(right);

  info_box.style.display = right > 0 ? "block" : "none";
  info_box.style.right = right > 0 ? "0px" : "-316px";
}

function degTime() {
  var start = +new Date
  var deg_dist = graph.degreeDistribution()
  var end = +new Date
  console.log('Time taken to compute degree histogram: ' + (end-start) + ' ms.')
  return deg_dist
}

function bfsTime() {
  var start = +new Date
  var bfs_res = $G.search.BFS(graph, graph.getRandomNode())
  var end = +new Date
  console.log('Time taken to compute BFS: ' + (end-start) + ' ms.')
  return bfs_res;
}

function dfsTime() {
  var start = +new Date
  var dfs_res = $G.search.DFS(graph, graph.getRandomNode())
  var end = +new Date
  console.log('Time taken to compute DFS: ' + (end-start) + ' ms.')
  return dfs_res;
}

function runStatistics() {
  console.log("")
  console.log("// Browser test using local CSV edge list file.");
  console.log("Starting GraphiniusJS edge list import @ " + window.start + " ms.");
  console.log("Graph imported @ " + window.end + " ms.");
  console.log("Time taken to import: " + (end-start) + " ms.");
  console.log("============================================================");
  console.log("Number of nodes read: " + graph.nrNodes());
  console.log("Number of edges read: " + graph.nrUndEdges());
  console.log("============================================================");
  degTime()
  bfsTime()
  dfsTime()
}