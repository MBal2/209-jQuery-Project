var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
let ServercarArray = [];
let carObject = function (pData, pType, pYear) {
  this.data = pData;
  this.type = pType;
  this.year = pYear;
}
ServercarArray = fileManager.read();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('index.html');
});


router.get('/getAllData', function(req, res, next) {
  res.status(200).json(ServercarArray);
});

router.post('/AddCar', function(req, res){
  const newCar = req.body;
  ServercarArray.push(newCar);
  fileManager.write()
  res.status(200);
});

var fs = require("fs");

fileManager = {
  read: function(){
    const stat = fs.statSync('nodesData.json');
    if(stat.size !==0){
      var rawdata = fs.readFileSync('nodesData.json');
      ServercarArray = JSON.parse(rawdata);
    }
    else{
 
      c1 = new carObject("Toyota","SUV",2209);
      c2 = new carObject("Prius","Sedan",2009);
      c3 = new carObject("Kar","Coupe",2019);
      ServercarArray.push(c1)
      ServercarArray.push(c2)
      ServercarArray.push(c3)
      fileManager.write();
    }
  },
  write: function(){
    let data = JSON.stringify(ServercarArray);
    fs.writeFileSync('nodesData.json', data);
  }
}
module.exports = router;
