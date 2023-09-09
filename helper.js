import { on } from "events";
import * as sqldata from "./DBManager.js";
import { get } from "http";
import { type } from "os";
import exp from "constants";

export var backcode = 420;

/*
4000 means that all is well 
1001 means that the name is null
1002 means that the name is repeated
*/


export async function mainpageload(){
    let obj1 = await sqldata.getfutureschedule();
    obj1 = correctdate(obj1);
    let obj = [obj1];
    return obj;
}

function correctdate(obj){
    obj.forEach(ele => {
        let s = String(ele.date).substring(0,15);
        ele.date = s;
    })
    return obj;
}

export async function  addfood(obj){
    // let name = obj.Name;
    // if(name===null || name===''){
    //     backcode = 1001;
    // }else{
    //     let a = await sqldata.repeated_food_names(name);
    //     if(a === 0){
    //         backcode = 4000;
    //     }else{
    //         backcode = 1002;
    //     }
    // }
    // if(backcode===4000){
    //     console.log("i will tell data base ");
    // }
    // else if(backcode>=1000 && backcode<=1020){
    //     console.log("going back to app js");
    // }

    let difficultyLevels = ["EASY","BEGINNER","NOVICE","NORMAL","INTERMEDIATE","ROOKIE","PRO","ADVANCED","MASTER","LEGENDARY","GOD"]

    obj.Difficulty = difficultyLevels[obj.Difficulty];

    console.log(obj);


    let n = await sqldata.addfood(obj);
    if(obj.Linkval === ''){
        // no links are attached
    }else{
        let obl = {
            linkid : n,
            linktype : "F",
            linkname : "",
            linkval : ""
        }

        if(Array.isArray(obj.Linkval)){
            for(var i=0;i<obj.Linkval.length;i++){
                obl.linkname = obj.Linkname[i];
                obl.linkval = obj.Linkval[i];
                await sqldata.addlink(obl);
            }
        }else{            
            obl.linkname = obj.Linkname;
            obl.linkval = obj.Linkval;
            await sqldata.addlink(obl);
        }
    }
}


export async function addIngredient(obj){
    await sqldata.addingredient(obj);
    if(obj.linkval != ''){
        if(Array.isArray(obj.linkval)){
            var i = 0;
            for(;i<obj.linkval.length;i++){
                let obl = {
                    type : "I",
                    linkname : obj.Linkname[i],
                    linkdata : obj.Linkval[i]
                }
                await sqldata.addlink_without_id(obl);
            }
        }else{
            let obl = {
                type : "I",
                linkname : obj.Linkname,
                linkdata : obj.Linkval
            }
            await sqldata.addlink_without_id(obl);
        }
    }
}

export async function foodlibdata(){
    let fooddata = await sqldata.foodlibdata();
    return fooddata;
}

export async function inglibdata(){
    let ingdata = await sqldata.inglibdata();
    return ingdata;
}

async function getfoodnames(){
    let data = await sqldata.getfoodnames();
    data = data.map(ele => Object.values(ele)[0]);
    return data;
}

async function upcomingmeals(){
    let data = await sqldata.upcomingmeals();
    return data;
}

async function tastemenu(){
    let data = await sqldata.distinctTasteOfFood();
    data = data.map(ele => Object.values(ele)[0])
                .filter(ele => ele!='');
    return data;
}

async function typemenu(){
    let data = await sqldata.distinctTypeOfFood();
    data = data.map(ele => Object.values(ele)[0])
                .filter(ele => ele!='');
    return data;
}

export async function setmealload(){
    let data1 = await getfoodnames();
    let data2 = await upcomingmeals();
    let data3 = await typemenu();
    let data4 = await tastemenu();
    let data = [data1,data2,data3,data4];
    return data;
}


export async function meal_filters(fils,pastData){
    let ty = fils.type;
    let ta = fils.taste;
    if(Array.isArray(ta)===false){
        ta = [ta];
    }
    if(Array.isArray(ty)===false){
        ty = [ty];
    }
    let newdata = await sqldata.filteredmeals(ty,ta);
    pastData[0] = newdata.map(ele => Object.values(ele)[0]);
    return pastData;
}

export async function set_future(obj){
    let today = new Date();
    if(obj.date === ""){
        obj.date = today;
    }
    let t = obj.date;
    obj.date = t.getFullYear()+"-"+t.getMonth()+"-"+t.getDay()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
    let i = await sqldata.get_id_by_name(obj.food);
    let obx = {
        date : obj.date,
        meal : obj.meal,
        priority : obj.priority,
        id : i
    }
    await sqldata.set_future(obx);
}

export async function getfooddata(s){
    let foodsdata = await sqldata.getfoodsall(s);
    foodsdata = foodsdata[0];
    let outdata = {
        name: foodsdata.name,
        id: foodsdata.id,
        type: foodsdata.type,
        taste: foodsdata.taste,
        ratings: foodsdata.ratings,
        comments: foodsdata.ratings,
        process: foodsdata.process,
        reps: foodsdata.reps,
        preptime: foodsdata.preptime,
        difficulty: foodsdata.difficulty,
        img : foodsdata.image,
        linkval : [] ,
        linkname : []
    }
    let linkdata = await sqldata.get_links(foodsdata.id,"F");
    if(linkdata.length != 0){
        for(var i=0;i<linkdata.length;i++){
            outdata.linkval.push(linkdata[i].linkdata);
            outdata.linkname.push(linkdata[i].linkname);
        }
    }
    return outdata;
}

export async function getIngAll(s){
    let ingData = await sqldata.getIngData(s);
    let outdata = { ingid: ingData.ingid, ingredient: ingData.ingredient, type: ingData.type, cost: ingData.cost ,
            linkval : [] , linkname : []
        }
    let linkdata = await sqldata.get_links(ingData.ingid,"I");
    if(linkdata.length != 0){
        for(var i=0;i<linkdata.length;i++){
            outdata.linkval.push(linkdata[i].linkdata);
            outdata.linkname.push(linkdata[i].linkname);
        }
    }
    return outdata;
}

