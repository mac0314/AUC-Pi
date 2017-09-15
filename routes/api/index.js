var express = require('express');
var router = express.Router();

var fileModel = require('../../models/file.model');

/*
  POST

  Receive file.
*/
router.post('/upload/file', function(req, res, next) {
  console.log("Upload file");

  fileModel.saveFile(req, function(error, resultObject){
    res.json(resultObject);
  });
});

module.exports = router;
