import { on } from "events";
import * as sqldata from "./DBManager.js";
import { get } from "http";
import { type } from "os";

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

export async function addfood(obj){
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

    await sqldata.addfood(obj);

}


export async function addIngredient(obj){
    await sqldata.addingredient(obj);
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