var cors = require('cors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var app = module.exports = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:dateval',function(req,res,next){
	var dateval=req.params.dateval;

	var convertDate = Date.parse(dateval.match(/[a-zA-Z]+|[0-9]+/g).join(" "));

	if (!isNaN(dateval)) {
		console.log('unix time' +dateval);
		var naturalDate = moment.unix(dateval).format('LL');
		console.log(naturalDate);
		res.json({unix : dateval, naturalDate :naturalDate});

	}else if (!isNaN(convertDate)) { 

		res.json({unix :convertDate  , naturalDate : dateval});
	}else{

		res.json({unix :  null , naturalDate : null});	
		}
});

app.listen(port,function(){
console.log('app is working on port '+port);
})
