
const express = require("express");
const app = express();
const port = 3001; // <- 3000에서 다른 숫자로 변경
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require('request');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const dotenv = require("dotenv").config({ path: '../../.env' });

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let link=''
let keyword_text = '';

const {KMR, KKMA} = require('koalanlp/API');
const {initialize} = require('koalanlp/Util');
const {Tagger, Parser} = require('koalanlp/proc');


app.post("/text", (req, res) => {
  const textdata = req.body.inText;
  console.log(textdata); 


  const url = "https://openapi.naver.com/v1/search/image.json?query=" + encodeURI(textdata) + "&display=1&start=1&sort=sim";
  
  const options = {
    url: url,
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    }
  };
  
  request.get(options, (error, response, body) => { 
      if(!error && response.statusCode == 200){
      
      const parseJsonToObject = JSON.parse(body);
      
      link = parseJsonToObject['items'][0]['link']; 
      console.log(link);
      
      keyword_text = '';
        res.json(link);

      }else{
        console.log(`error = ${response.statusCode}`);
      }
      
    })
  });

    
  app.post("/keyword", (req, res) => {//데이터 받는 곳
  const textdata = req.body.inText;
  console.log(textdata); 
  
  
  const url = "https://openapi.naver.com/v1/search/news.json?query=" + encodeURI(textdata) + "&display=100&start=1&sort=sim";
  
  const options = {
    url: url,
    headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      }
      
  };
  request.get(options, (error, response, body) => { 
    if(!error && response.statusCode == 200){
      
      const parseJsonToObject = JSON.parse(body);
      console.log(typeof parseJsonToObject, parseJsonToObject);
      
      const display = parseJsonToObject['display']; 
      console.log(display);

      let description;
      for(var i = 0; i < display ; i++){
        description = description + parseJsonToObject['items'][i]['description'];
      }
      console.log(description);

        executor(description).then(() => {
          res.json(keyword_text);
        }).catch((err) => console.error('Error occurred!', err)).finally(()=>console.log("end"));
      }else{
        console.log(`error = ${response.statusCode}`);
      }
  });
  });
  
  async function executor(description){
    await initialize({packages: {KMR: '2.0.4', KKMA: '2.0.4'}, verbose: true});

    let tagger = new Tagger(KMR);
    const text = description; 
    var arrNumber = new Array();
    var index = 0;
    var sortable = {};
    let tagged = await tagger(text);
      tagged.forEach((sent, i) => {
          console.log(`===== Sentence #${i} =====`);
          console.log(sent.surfaceString());
  
          console.log("# Analysis Result");
          sent.forEach((word) => {
              
              word.forEach((morph) =>{
                if(morph.tag['tagname'] == 'NNP' || morph.tag['tagname'] == 'NNG'){
                  arrNumber[index] = morph.surface;
                  index++;
                }
              })
  
          });
      });
  
      const result = {};
      arrNumber.forEach((x) => { 
        result[x] = (result[x] || 0)+1; 
      });
  
      sortable = Object.entries(result)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  
      console.log(sortable);

      let index_r = 0;
      for (i of Object.keys(sortable)) {
        keyword_text = keyword_text + ' ' + i;
        if (index_r == 1) {
          break;
        }
        index_r++;
      }
    }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});