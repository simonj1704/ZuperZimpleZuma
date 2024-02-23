"use strict";

import Controller from "./controller.js";

window.addEventListener("load", start);

function start() {
    console.log("JS is running");
    let controller = new Controller();
    controller.start();
}
