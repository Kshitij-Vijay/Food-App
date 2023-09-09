import mysql from 'mysql2';
import * as datafuncs from "./datafuncs.js";
import express from 'express';

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "*1+1J_Zero00",
    database : "food",
}).promise();

let foods = "foods",future = "future",history = "history",ingredients = "ingredients",process = "process";

let query;

// connection is set 

export async function getfutureschedule(){
    query = "select future.date,future.meal,foods.name from future inner join foods on foods.id = future.id order by future.date;";
    let data = await pool.query(query);
    return data[0];
}

export async function repeated_food_names(n){
    let query = "select name from foods where name = '" + n + "';";
    let data = await pool.query(query);
    return data[0].length;
}

export async function addfood(obj){
    let q = "insert into foods(name,type,taste,ratings,comments,preptime,difficulty) values('";
    q = q + obj.Name + "','" + obj.Type + "','" + "'," + obj.Ratings + ",'" + obj.Comments;
    q = q + "','" + obj.preptime_hours + ":" + obj.preptime_minutes + "','" + obj.Difficulty + "');";
    await pool.query(q);
    let q2 = " SELECT id FROM foods ORDER BY id DESC LIMIT 1;";
    let data = await pool.query(q2);
    return (data[0])[0].id;
}

export async function addingredient(obj){
    let q = "insert into ingredients(ingredient,type,cost) values('" + obj.Name + "','" + obj.Type + "'," + obj.Cost + ");";
    await pool.query(q);
}

export async function foodlibdata(){
    let q = "select name,type,taste,ratings,reps,difficulty from foods;";
    let data = await pool.query(q);
    return data[0];
}


export async function inglibdata(){
    let q = "select ingredient,type,cost from ingredients;";
    let data = await pool.query(q);
    return data[0];
}

export async function getfoodnames(){
    let q = "select name from foods;";
    let data = await pool.query(q);
    return data[0];
}

export async function upcomingmeals(){
    let q = "select future.date,future.meal,foods.name from future inner join foods on future.id = foods.id order by future.date;";
    let data = await pool.query(q);
    return data[0];
}

export async function distinctTypeOfFood(){
    let q = "select distinct type from foods order by type;";
    let data = await pool.query(q);
    return data[0];
}

export async function distinctTasteOfFood(){
    let q = "select distinct taste from foods where taste is not null order by taste;";
    let data = await pool.query(q);
    return data[0];
}


export async function filteredmeals(ty,ta){
    let q = "select name from foods where";
    if(ty.length !=0){
        q = q + " type = '";
        for(var i=0;i<ty.length-1;i++){
            q = q + ty[i] + "' or type ='";
        }
        q = q + ty[ty.length-1] + "' "
    }
    if(ty.length !=0 && ta.length !=0){
        q = q + "or";
    }
    if(ta.length !=0){
        q = q + " taste = '";
        for(var i=0;i<ta.length-1;i++){
            q = q + ta[i] + "' or taste ='";
        }
        q = q + ta[ta.length-1] + "' "
    }
    q = q + " order by name;";
    let data = await pool.query(q);
    return data[0];
}

export async function get_id_by_name(s){
    let q = "select id from foods where name = '"+s+"';";
    let data = await pool.query(q);
    return (data[0])[0].id;
}

export async function set_future(obj){
    let q = "insert into future values('"+obj.date+"','"+obj.meal+"',"+obj.priority+","+obj.id+");";
    await pool.query(q);
}

export async function getfoodsall(s){
    let q = "select * from foods where name = '"+s+"';";
    let data = await pool.query(q);
    return data[0];
}

export async function addlink_without_id(obj){
    let q = "insert into links(linktype,linkname,linkdata) values ('"+obj.type+"','"+obj.linkname+"','"+obj.linkdata+"');";
    await pool.query(q);
}


export async function addlink(obj){
    let q = "insert into links values('"+obj.linkid+"','"+obj.linktype+"','"+obj.linkname+"','"+obj.linkval+"');";
    await pool.query(q);
}

export async function getIngData(s){
    let q = "select * from ingredients where ingredient = '"+s+"';";
    let data = await pool.query(q);
    return data[0][0];
}

export async function get_id_by_ingname(s){
    let q = "select ingid from ingredients where ingredient = '"+s+"';";
    let data = await pool.query(q);
    return (data[0])[0].ingid;
}

export async function get_links(s,v){
    let q = "select * from links where linkid = "+s+" and linktype = '"+v+"';";
    let data = await pool.query(q);
    return data[0];
}
