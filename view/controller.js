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
        this.model.insertAfterNode(this.cannonBall, ball)
        this.model.dump();
        let inBall = this.model.get(index+1).data;
        this.view.insertNewBallAfter(index, inBall)

        setTimeout(() => {
            this.checkforMatches(this.model.get(index+1));
        }, 1200);
    }

    checkforMatches(index){
        let matches = this.model.findMatchesAround(index);
        if (matches.length >= 3){
            this.removeMatches(matches);

        }
    }

    removeMatches(matches){
        for (let index = 0; index < matches.length; index++) {
            this.view.animateBallToDisappear(this.view.ballChain[matches[index]]);
            
        }
        setTimeout(() => {
        this.displayBalls(this.model);
        }, 700);
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