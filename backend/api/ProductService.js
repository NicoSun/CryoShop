'use strict';


/**
 * Add a new product to the store
 * Add a new product to the store
 *
 * body Product Create a new product in the store
 * returns product
 **/
exports.addproduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add a new product to the store
 * Add a new product to the store
 *
 * body Product Create a new product in the store
 * returns product
 **/
exports.addproduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a product
 * delete a product
 *
 * productId Long product id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteproduct = function(productId,api_key) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Finds products by status
 * Multiple status values can be provided with comma separated strings
 *
 * status String Status values that need to be considered for filter (optional)
 * returns List
 **/
exports.findproductsByStatus = function(status) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
}, {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds products by tags
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 *
 * tags List Tags to filter by (optional)
 * returns List
 **/
exports.findproductsByTags = function(tags) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
}, {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find product by ID
 * Returns a single product
 *
 * productId Long ID of product to return
 * returns product
 **/
exports.getproductById = function(productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing product
 * Update an existing product by Id
 *
 * body Product Update an existent product in the store
 * returns product
 **/
exports.updateProduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing product
 * Update an existing product by Id
 *
 * body Product Update an existent product in the store
 * returns product
 **/
exports.updateProduct = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrls" : [ "photoUrls", "photoUrls" ],
  "name" : "Toothpaste",
  "id" : 10,
  "category" : {
    "name" : "Personal Hygiene",
    "id" : 1
  },
  "tags" : [ {
    "name" : "name",
    "id" : 0
  }, {
    "name" : "name",
    "id" : 0
  } ],
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates a product in the store with form data
 *
 * productId Long ID of product that needs to be updated
 * name String Name of product that needs to be updated (optional)
 * status String Status of product that needs to be updated (optional)
 * no response value expected for this operation
 **/
exports.updateproductWithForm = function(productId,name,status) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * uploads an image
 *
 * body Object  (optional)
 * additionalMetadata String Additional Metadata (optional)
 * productId Long ID of product to update
 * returns ApiResponse
 **/
exports.uploadFile = function(body,additionalMetadata,productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "type" : "type",
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

