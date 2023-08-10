//import * as moduleA from "./moduleA.js";

import {helloA} from "./moduleA.js"

function main(){
    console.log("This is main!");
}
main();
//moduleA.helloA();
helloA();

import test, { helloB } from "./moduleB.js"

console.log(test);

import * as moduleC from "./static/moduleC.js"

moduleC.helloC();
