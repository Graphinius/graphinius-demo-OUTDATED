
var start,
    end,
    struct = {},
    struct_size = 5000,
    map = new Map(),
    i = 0,
    nr_objects = 0;


function initStruct() {
  struct = {};
  for (i = 0; i < struct_size; i++) {
    struct[i] = i;
    nr_objects++;
  }
}


function initMap() {
  map = new Map();
  for (i = 0; i < struct_size; i++) {
    map.set(i, i);
    nr_objects++;
  }
}


function objKeyCountTest() {
  initStruct();

  start = +new Date();
  for (i = 0; i < struct_size; i++) {
    var blahoo = Object.keys(struct).length;
    // var blahoo = nr_objects;
  }
  end = +new Date();
  console.log("Counting length of struct " + struct_size + " times took " + (end-start) + " ms.");
}


function objMapCountTest() {
  initMap();

  start = +new Date();
  for (i = 0; i < struct_size; i++) {
    var size = map.size;
  }
  end = +new Date();
  console.log("Counting size of Map " + struct_size + " times took " + (end-start) + " ms.");
}


function deleteKeysViaOperatorTest() {
    initStruct();
    start = +new Date();
    for (i = 0; i < struct_size; i++) {
      delete struct[i];
    }
    end = +new Date();
    console.log("Deleting all " + struct_size + " keys in struct via delete operator took " + (end-start) + " ms.");
}


function deleteKeysViaDeleteMethod() {
    initMap();
    start = +new Date();
    for (i = 0; i < struct_size; i++) {
      map.delete(i);
    }
    end = +new Date();
    console.log("Deleting all " + struct_size + " keys in Map via delete method took " + (end-start) + " ms.");
}


function setKeysUndefinedTest() {
    initStruct();
    start = +new Date();
    for (i = 0; i < struct_size; i++) {
      struct[i] = undefined;
    }
    end = +new Date();
    console.log("Setting all " + struct_size + " keys in struct undefined took " + (end-start) + " ms.");
}


function runTests() {
  objKeyCountTest();
  objMapCountTest();
  deleteKeysViaOperatorTest();
  deleteKeysViaDeleteMethod();
  setKeysUndefinedTest();
}

// runTests();
