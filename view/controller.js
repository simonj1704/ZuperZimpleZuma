"use strict";

import Model from "../model/Model.js";
import View from "../view/View.js";

window.addEventListener("load", start);

function start() {
    console.log("JS is running");

}







export default class Controller{
    constructor(){
        this.view = new View(this);
        this.model = new Model();
        this.cannonBall = this.model.randomBall();

        
    }

    init(){
        this.createBalls();
        this.displayBalls(model);
        this.getCannonBall();
    }

    shootBall(index){
        console.log("shootBall");
        let ball = model.get(index);
        model.insertBeforeNode(cannonBall, ball)
        model.dump();
        displayBalls(model);
    }

    createBalls(){
        for (let index = 0; index < 5; index++) {
            model.add(model.randomBall());
        }
        model.dump();
    }
    
    displayBalls(model){
        let balls = [];
        let i = 0; 
        while (model.get(i) != null){
            balls.push(model.get(i).data);
            i++;
        }
        view.displayEntireChain(balls);
    }

    getCannonBall(){
        cannonBall = model.randomBall();
        view.displayCannonBall(cannonBall);
    }
}