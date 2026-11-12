// select any of the following nodes : chilomoni, namiwawa, victoria_ave, mandala, nyambadwe, mbayani, chirimba, machinjiri, ndirande, chichiri, poly_village, ginnery_conner, kanjedza, limbe, chinyonga, kampala, kapeni, manja, zingwangwa, chilobwe, manase, sunnyside, mount_pleasant, naperi chitawira, njamba, chiwembe;

//enter starting point 
let starting_point = "naperi";

//enter destination
let destination = "kampala";

const graph = {

  chilomoni: { namiwawa : 7},
  namiwawa : { chilomoni : 7, victoria_ave: 5 },
  victoria_ave : { namiwawa : 5, mandala : 1, nyambadwe: 8 },
  mandala : { victoria_ave : 1, mount_pleasant : 3 , ginnery_conner: 5},
  nyambadwe : { victoria_ave : 8, mbayani : 6, ndirande : 9},
  mbayani : { nyambadwe : 6, chirimba : 11},
  chirimba : { mbayani : 11, machinjiri : 13},
  machinjiri : { chirimba : 13, ndirande : 18},
  ndirande : { nyambadwe : 9, machinjiri : 18, chichiri : 11},
  chichiri : { ginnery_conner : 4, ndirande : 11, poly_village : 5, chinyonga : 7, kanjedza : 11},
  poly_village : { chichiri : 5, kanjedza : 5, limbe : 5},
  ginnery_conner : {mandala : 5, chichiri: 4, naperi: 2},
  kanjedza : { poly_village : 5, limbe : 2, chichiri : 11, chinyonga : 4},
  limbe : {poly_village : 5, kanjedza : 2, chiwembe : 8},
  chinyonga : { kampala : 5, njamba : 4, kanjedza : 4, chichiri : 7},
  kampala : { kapeni: 3, manja : 6, chinyonga: 5},
  kapeni : {kampala : 3, manja : 4,},
  manja : {kampala : 6, kapeni : 4, zingwangwa : 4, njamba: 4},
  zingwangwa : {manja : 4, chilobwe : 5, manase: 9, naperi :3},
  chilobwe : {zingwangwa : 5, manase :10},
  manase : {zingwangwa : 9,chilobwe: 10, sunnyside : 6},
  sunnyside : {mount_pleasant : 3, manase : 6,},
  mount_pleasant : {sunnyside :3, naperi : 4, mandala :3},
  naperi : {mount_pleasant :4, zingwangwa : 3, chitawira :1, ginnery_conner: 2},
  chitawira : {naperi : 1, njamba :3},
  njamba : {chinyonga : 4, manja :4, chitawira :3},
  chiwembe : {limbe : 8}

};

const result = djikstra(graph, starting_point, destination);

console.log(result);

function djikstra(graph, start, end) {

  let distances = {};
  let previous = {};
  let unvisited = new Set();

  // Initialise distances and unvisited nodes
  for (let node in graph) {
    if (node === start) {
      distances[node] = 0;
    } else {
      distances[node] = Infinity;
    }

    unvisited.add(node);
  }

  // Find the shortest distances
  while (unvisited.size) {

    let closestNode = null;

    for (let node of unvisited) {
      if (!closestNode || distances[node] < distances[closestNode]) {
        closestNode = node;
      }
    }

    if (distances[closestNode] === Infinity) break;
    if (closestNode === end) break;

    // Update neighbouring nodes
    for (let neighbor in graph[closestNode]) {

      let newDistance =
        distances[closestNode] + graph[closestNode][neighbor];

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closestNode;
      }
    }

    // Remove the visited node
    unvisited.delete(closestNode);
  }

  // Check if destination is reachable
  if (distances[end] === Infinity) {
    return null;
  }

  // Reconstruct the shortest path
  let path = [];
  let node = end;

  while (node) {
    path.push(node);
    node = previous[node];
  }

  actualDistance = distances[end] * 0.5;
  return {
    path: path.reverse(),
    distance: distances[end],
  };
}
