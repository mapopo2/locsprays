import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const ingredientsJSON = 
'[{"id":"1","type":"locSpray","name":"Rosewater Spray","contents":{"oils":{"name":"vegetable glycerine","quantity":"5-8 drops"},"optional":{"name":"jojoba, coconut, rosemary and almond oil"},"liquid":[{"name":"rosewater","quantity":"fill container"}]}},{"id":"2","type":"locSpray","name":"Aloe Vera Spray","contents":{"oils":{"name":"vegetable glycerine","quantity":"5-8 drops"},"optional":{"name":"jojoba, coconut, rosemary and almond oil"},"liquid":[{"name":"aloe vera juice","quantity":"1 part"},{"name":"rosewater","quantity":"3 parts"}]}},{"id":"3","type":"locSpray","name":"Herb Spray","contents":{"oils":{"name":"vegetable glycerine","quantity":"5-8 drops"},"optional":{"name":"jojoba, coconut, rosemary and almond oil"},"liquid":[{"name":"clove water","quantity":"1 part"},{"name":"rosemary water","quantity":"1 part"},{"name":"aloe vera juice","quantity":"1 part"},{"name":"rosewater","quantity":"3 parts"}]}}]';
   //have to use '' instead of " ".

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

app.get("/", (req, res) => {

  let today  = new Date();
  let year = today.getFullYear();

  res.render("index.ejs", {ingredients: data, currentYear: year});
});

app.post("/contents", (req, res) => {

    switch (req.body.choice) {
        case "rosewater":
          data = JSON.parse(ingredientsJSON)[0];
          //[0] because you've tapped into an array for the buttons in the form
          //.parse - making flatpack JSON into javascript object (the full 'wardrobe')
          break;
    
        case "aloe":
          data = JSON.parse(ingredientsJSON)[1];
          break;
    
        case "herbs":
          data = JSON.parse(ingredientsJSON)[2];
          break;
          
        default:
            // "sorry nothing to show";
          break;
      }
    res.redirect("/");
    //this creates a new get request to that url
    
              
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
//http://localhost:3000/