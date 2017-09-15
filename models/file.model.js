

var multiparty = require('multiparty');

exports.saveFile = function(req, callback){
  var resultObject = new Object({});

  var form = new multiparty.Form();

  form.on('field', function(name, value){

  });

  form.on('part', function (part) {

  });

  // all uploads are completed
  form.on('close',function(){

  });

  // track progress
  form.on('progress',function(byteRead, byteExpected){
    //console.log(' Reading total  '+ byteRead + '/' + byteExpected);
  });

  form.on('error', function (err) {
    //console.log('error');
    //handle other error
  });

  form.parse(req, function(error, fields, files){
    console.log(req.files);
    console.log(fields);
    console.log(req.body);
    console.log(files);
    var myFile = files.file[0];

    Object.keys(fields).forEach(function(name) {
      console.log('got field named ' + name);
    });

    Object.keys(files).forEach(function(name) {
      console.log('got file named ' + name);

      resultObject.file = name;
      resultObject.upload = true;

    });
    
    console.log('Upload completed!');

    callback(null, resultObject);
  });

};
