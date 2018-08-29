const express = require('express');
const async = require('async')
const libRadis = require('../model/dbRadis');

const router = express.Router();

/* GET Api listing. */
router.get('/', function(req, res) {
	let data = "";
	async.series([
		(next)=>{
			libRadis.client.SMEMBERS('api', (err, results) =>{
				if(err){
					console.log("Error: " + err + " - " + new Date().toISOString());
					return;
				}
				data = JSON.stringify(results);
				next();
			});
		}
	],(errs, results)=>{
		res.send(data);
	});
});

module.exports = router;
