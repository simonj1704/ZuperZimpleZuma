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

    start(){
        this.init();
    }

    init(){
        this.createBalls();
        this.displayBalls(this.model);
        this.getCannonBall();
    }

    shootBall(index){
        console.log("shootBall");
        this.insertOneBall(index);

        this.getCannonBall();
    }

    insertOneBall(index){
        let ball = this.model.get(index);
        this.model.insertBeforeNode(this.cannonBall, ball)
        this.model.dump();
        let inBall = this.view.createVisualBall(this.cannonBall)
        console.log(inBall)
        console.log(this.view.insertNewBallAfter(index, inBall))
        this.view.animateExpandSpaceForBall(inBall);

    }

    createBalls(){
        for (let index = 0; index < 5; index++) {
            this.model.add(this.model.randomBall());
        }
        this.model.dump();
    }
    
    displayBalls(model){
        let balls = [];
        let i = 0; 
        while (model.get(i) != null){
            balls.push(model.get(i).data);
            i++;
        }
        this.view.displayEntireChain(balls);
    }

    getCannonBall(){
        this.cannonBall = this.model.randomBall();
        this.view.displayCannonBall(this.cannonBall);
    }
}