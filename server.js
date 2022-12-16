const express = require("express");
const path = require("path");
const fetch = require('node-fetch')
const cors = require('cors')
const app = express();
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public/build"));
app.use(express.static("public"));

const PORT = process.env.PORT || 5010;

const API_KEY = process.env.MAP_API_KEY || ''


app.get('/getElevation/:lat/:lon', async (req,res)=> {
  const lat = req.params['lat']
  const lon = req.params['lon']

  const promiseArr = []

  const urls = [`https://api.opentopodata.org/v1/test-dataset?locations=${lat},${lon}`, 
  `https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lon}&key=${API_KEY}`
  ]

  for(let url of urls){
    promiseArr.push(fetch(url))
  }

  try {
    const results = await Promise.all(promiseArr)

    const openTopoResponse = await results[0].json()
    const googleElevationServiceResponse = await results[1].json()

    res.json({ 
        status: true, 
        elevation: openTopoResponse.results[0].elevation,
        googleElevation: googleElevationServiceResponse.results[0].elevation
      })
    
  } catch (error) {
    res.json({ status: false, message: "something went wrong"})  
  }
})

app.post('/getVanGenuchtenParams', async (req,res)=> {
  const reqBody = JSON.stringify(req.body)
  console.log('reqBody', reqBody)
  const url = "http://www.handbook60.org/api/v1/rosetta/3"
  
  try {
    const resD = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: reqBody  
    });
    const responseData = await resD.json()  
    res.json(responseData)
  } catch (error) {
    console.log('error', error)
    res.json({status : false, message: "something went wrong"})
  }
  
})


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
