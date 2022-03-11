

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

          
          // const imageContext = useContext(ImageContext);
          // imageContext.updateImage(link);




          res.json(link);

        }else{
          console.log(`error = ${response.statusCode}`);
        }
        
      })
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});