const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require("express");
const methodOverride = require('method-override');
const router = express.Router();
const axios = require("axios");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(methodOverride());
app.use(require("body-parser").urlencoded({extended: true}));


router.post('/beer', async (req, res) => {
  const location = req.body;
  const lat = location.lat;
  const lng = location.lng
  try {
    const results = await axios.get(`https://api.brewerydb.com/v2/search/geo/point?lat=${lat}&lng=${lng}&key=cc12540abedfa669021307d4ba111d87&format=json`);
    res.json(results.data);
  } catch(err) {
    console.log(err);
  }
});

app.use('/', router);
app.listen(5151);