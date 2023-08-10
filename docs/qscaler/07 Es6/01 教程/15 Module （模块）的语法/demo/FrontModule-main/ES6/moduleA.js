function moduleA(){
    console.log("This is ModuleA!");
}
moduleA();
let helloA = function(){
    console.log("This is helloA!");
}

let helloA1 = function(){
    console.log("This is helloA1!");
}

export {helloA};

export {helloA1};