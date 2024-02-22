"use strict";

import Model from "../model/Model.js";
import View from "../view/View.js";

window.addEventListener("load", start);

function start() {
    console.log("JS is running");
    createBalls();
    displayBalls(model);
    getCannonBall();
}

const model = new Model();
const view = new View();


function createBalls(){
    for (let index = 0; index < 5; index++) {
        model.add(model.randomBall());
    }
    model.dump();
}

function displayBalls(model){
    let balls = [];
    let i = 0; 
    while (model.get(i) != null){
        balls.push(model.get(i).data);
        i++;
    }
    view.displayEntireChain(balls);
}

function getCannonBall(){
    view.displayCannonBall(model.randomBall());
}