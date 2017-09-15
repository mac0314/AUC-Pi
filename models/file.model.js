

var multiparty = require('multiparty');

var request = require('request');

var gcloudModel = require('../controllers/gcloud.controller');

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

      console.log('Upload completed!');
      // TODO audio translation

      gcloudModel.decodeAudioFile(files.file[0].path, function(error, objectDecoded){
        var url = "http://localhost:3000/auc/speaker";
        var postData = new Object({});
        var text = objectDecoded.data;
        //var text = "음료수랑 음식 추천되나";
        postData.text = text;

        request({
          url: url,
          method: 'POST',
          json: true,
          body: postData
        }, function (error, response, body) {
          resultObject.objectDecoded = objectDecoded;

          resultObject.file = name;
          resultObject.upload = true;

          resultObject.data = body;

          callback(null,resultObject);
        });
      });


    });

  });

};
