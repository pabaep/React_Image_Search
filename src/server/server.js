

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

const dotenv = require("dotenv");
dotenv.config();

const CLIENT_ID='ON3loCSF2CLvnJMjKwAC'
const CLIENT_SECRET='ScY6DnsZFB'
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;

let link=''

const {initialize} = require("koalanlp/Util");
const {Tagger} = require("koalanlp/proc");
const {EUNJEON} = require("koalanlp/API");

let check_index = 1;

app.post("/text", (req, res) => {//데이터 받는 곳
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
        // const parseBody = JSON.parse(body); // parse() : string -> object로 변환
      //   console.log(typeof parseBody, parseBody);
      
      const parseJsonToObject = JSON.parse(body);
      //   console.log(typeof parseJsonToObject, parseJsonToObject);
      
      link = parseJsonToObject['items'][0]['link']; 
      console.log(link);
      
        check_index = 1;
        res.json(link);

      }else{
        console.log(`error = ${response.statusCode}`);
      }
      
    })
  });

app.post("/keywordimage", (req, res) => {//데이터 받는 곳
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
          // const parseBody = JSON.parse(body); // parse() : string -> object로 변환
        //   console.log(typeof parseBody, parseBody);
        
        const parseJsonToObject = JSON.parse(body);
        
        link = parseJsonToObject['items'][0]['link']; 
        console.log(link);
        
          res.json(link);

        }else{
          console.log(`error = ${response.statusCode}`);
        }
        
      })
    });
    
    
  app.post("/keyword", (req, res) => {//데이터 받는 곳
  const textdata = req.body.inText;
  console.log(textdata); 
  
  var keyword_text = '';
  
  const url = "https://openapi.naver.com/v1/search/news.json?query=" + encodeURI(textdata) + "&display=100&start=1&sort=sim";
  //  + encodeURI(query) + "&display=10&start=1&sort=sim";
  
  const options = {
    url: url,
    headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      }
      
  };
  
  
  request.get(options, (error, response, body) => { 
    if(!error && response.statusCode == 200){
      // const parseBody = JSON.parse(body); // parse() : string -> object로 변환
      // console.log(typeof parseBody, parseBody);
      
      const parseJsonToObject = JSON.parse(body);
      console.log(typeof parseJsonToObject, parseJsonToObject);
      
      const display = parseJsonToObject['display']; 
      console.log(display);

      var description;
      for(var i = 0; i < display ; i++){
        description = description + parseJsonToObject['items'][i]['description'];
      }

      console.log(description);

      

      var sortable = {};

      initialize({packages: {EUNJEON: 'LATEST'}}).then(() => {
        let tagger = new Tagger(EUNJEON);
        const text = description; 
        // let tagged = await tagger(text);
        
        var arrNumber = new Array();
        var index = 0;
        let tagged = tagger.tagSync(text);
          tagged.forEach((sent, i) => {
              console.log(`===== Sentence #${i} =====`);
              console.log(sent.surfaceString());
      
              console.log("# Analysis Result");
              // console.log(sent.singleL ineString());
              sent.forEach((word) => {
                  
                  word.forEach((morph) =>{
                    if(morph.tag['tagname'] == 'NNP' || morph.tag['tagname'] == 'NNG'){
                      // console.log(morph.surface);
                      arrNumber[index] = morph.surface;
                      // console.log(index);
                      // console.log(morph.surface);
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

          var index_r = 0;
          for (i of Object.keys(sortable)) {
            
            keyword_text = keyword_text + ' ' + i;
            if (index_r == check_index) {
              break;
            }
            index_r++;
          }
          
          // console.log(keyword_text);
          res.json(keyword_text);
          // res.redirect('image');
          check_index++;
          // console.log(check_index);
          
        }).catch((err) => console.error('Error occurred!', err)).finally(()=>console.log("end"));;
        
      }else{
        console.log(`error = ${response.statusCode}`);
      }
    });
  });
  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});