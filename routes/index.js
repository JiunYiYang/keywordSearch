var express = require('express');
var router = express.Router();
var request = require('request');

// router.get('/', function(req, res, next) {
//   console.log(req.query.keywords);
//   UberSuggest(req.query.keywords);
//   console.log(result);
//   res.render('index', {
//     title: 'Express',
//     result: result
//   });
// });

var PythonShell = require('python-shell');

var options_u = {
    mode: 'json',
    pythonOptions: ['-u'],
    scriptPath: './../views',
};

var options_g = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './../views',
}

var ubersuggest;
var googletrends;

// function UberSuggest(go) {
//   getUberSuggest.send(go);

//   var result = getUberSuggest.on('message', function (message) {
//     return message;
//     console.log('crawled');
//   });

//   getUberSuggest.end(function (err) {
//     if (err){
//         throw err;
//     };
//     console.log('finished');
//   });
//   console.log('uberfin');
// };

// module.exports.keywordsGlobal = global.keywords;



// var myPythonScript = 'crawl.py';
// var pythonExecutable = 'python';
// var uint8arrayToString = function(data){
//     return String.fromCharCode.apply(null, data);
// };

// const spawn = require('child_process').spawn;
// const scriptExecution = spawn(pythonExecutable, [myPythonScript]);

// scriptExecution.stdout.on('data', (data) => {
//     console.log(String.fromCharCode.apply(null, data));
// });

/* GET index page. */


// getUberSuggest.send(JSON.stringify([1,2,3,4,5]));

// getUberSuggest.on('message', function (message) {
//   console.log(message);
//   router.get('/', function(req, res, next) {
//     res.render('index', {
//       title: 'Express',
//       result: message
//     });
//   });
// });
// getUberSuggest.end(function (err) {
//     if (err){
//         throw err;
//     };

//     console.log('finished');
// });
// router.get('/', function(req, res, next) {
//   console.log(req.query.keywords);
//   res.render('index', {
//     title: 'Express',
//     result: req.query.keywords
//    });
// });

//  post listener
// router.post('/', function(req, res) {
//   var keywords = req.body.keywords;
//   console.log('Keywords is ' + keywords);
//   var data = JSON.stringify([1,2,3,4,5]);
//   scriptExecution.stdin.write(data);
//   scriptExecution.stdin.end();

//   scriptExecution.stdout.on('data', (data) => {
//     console.log(uint8arrayToString(data));
//   });
//   scriptExecution.stderr.on('data', (data) => {
//     console.log(uint8arrayToString(data));
//     res.end(uint8arrayToString(data));
//   });
//   scriptExecution.on('exit', (code) => {
//     console.log('Process quit with code : ' + code);
//   }); 
// });

router.get('/', function(req, res, next) {
  
  console.log(req.query.keywords);
  if (req.query.keywords != null) {
    var getGoogleTrends = new PythonShell('googleTrendsAPI.py', options_g);
    // var getUberSuggest = new PythonShell('crawl.py', options_u);

    getGoogleTrends.send(req.query.keywords);
    // getUberSuggest.send(req.query.keywords);

    getGoogleTrends.on('message', function (message) {
      console.log(message);
      googletrends = message;
      res.render('index', {
        title: 'Express',
        // result: ubersuggest,
        trends_data: googletrends_local,
        trends: ''
      });
      
    });

    // getUberSuggest.on('message', function (message) {
    //   console.log(message);
    //   ubersuggest = message;
    //   var googletrends_local = googletrends;
      
    // });

    getGoogleTrends.end(function (err) {
      if (err){
        throw err;
      };
      console.log('finished');
    });

    // getUberSuggest.end(function (err) {
    //   if (err){
    //     throw err;
    //   };
    //   console.log('finished');
    // });
    // request('http://www.google.com', function(error, response, body) {
    //   console.log('error: ', error);
    //   console.log('body: ', body);
      
    //   res.render('index', {
    //   title: 'Express',
    //   result: body
    //   });
    // });
  }
  else {
    res.render('index', {
      title: 'Express',
      // result: 'type your keyword and click generate to get quick results!',
      trends_data: '',
      trends: ''
    });
  }
});




  // var keywords = req.body.keywords;
  // console.log('Keywords is ' + keywords);
  // return keywords;
  // getUberSuggest.send(JSON.stringify([1,2,3,4,5]));

  // getUberSuggest.on('message', function (message) {
  //   console.log(message);
  //   res.end(message);
  // });

  // getUberSuggest.end(function (err) {
  //   if (err){
  //     throw err;
  //   };
  //   console.log('finished');
  // });


// router.post('/', function(req, res) {
//   var keywords = req.body.keywords;
//   console.log('Keywords is ' + keywords);
//   return keywords;
//   getUberSuggest.send(JSON.stringify([1,2,3,4,5]));

//   getUberSuggest.on('message', function (message) {
//     console.log(message);
//     res.end(message);
//   });

//   getUberSuggest.end(function (err) {
//     if (err){
//       throw err;
//     };
//     console.log('finished');
//   });

// });

module.exports = router;