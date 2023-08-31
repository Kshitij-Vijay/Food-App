import  express  from "express";
import * as rawdata from "./helper.js";
import {backcode} from "./helper.js";
import * as rep from "./public/javascript/replies_backcode.js";
const app = express();
const port = 8083;
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.listen(port,() => {
    console.log(`server is running at port ${port}`);
})

app.get("/FoodApp", async (req,res) => {
    console.log("get request to main page");
    let data = await rawdata.mainpageload();
    res.render("mainpage.ejs",{data});
})

app.get("/add/food",async (req,res) => {
    console.log("add new food page load get req")
    res.render("addFood.ejs");
})


app.post("/add/food",async (req,res) => {
    console.log("add new food page submit post req");
    let data = req.body;
    console.log(data);
    rawdata.addfood(data);


    // console.log("back code : "+backcode);
    // if(backcode===4000 || backcode===420){
    //     console.log("everything good to server and database");
    // }else{
    //     console.log("some error");
    // }
    
    
     res.redirect("/FoodApp");
})

app.get("/add/ingredient",async (req,res) => {
    console.log("add new ingredient page load get req");
    res.render("addIngredient.ejs");
})

app.post("/add/ingredient", async (req,res) => {
    console.log("add new ingredient page submit post req");
    let data = req.body;
    rawdata.addIngredient(data);
    res.redirect("/FoodApp");
})

app.get("/lib/food",async (req,res) => {
    console.log("inside food lib load get req");
    let data = await rawdata.foodlibdata();
    res.render("foodlib.ejs",{data});
})

app.get("/lib/ing",async (req,res) => {
    console.log("inside the ingredients library");
    let data = await rawdata.inglibdata();
    res.render("inglib.ejs",{data});
})

let settingmealData;

function settingmeal(obj){
    settingmealData = obj;
}

function get_setting_meals(){
    return settingmealData;
}

app.get("/set/meal",async (req,res) => {
    console.log("set the meal page load get req");
    let data = await rawdata.setmealload();
    settingmeal(data);
    res.render("setMeal.ejs",{data});
})

app.post("/set/filter",async (req,res) => {
    console.log("filter page in post load");
    let im = req.body;
    let data = await rawdata.meal_filters(im,get_setting_meals());
    settingmeal(data);
    res.redirect("/set/filter");
})

app.get("/set/filter",async (req,res) => {
    console.log("filter get page req");
    let data = get_setting_meals();
    res.render("setMeal.ejs",{data});
})
