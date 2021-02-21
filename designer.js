// ==UserScript==
// @name         Browsing Designer
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Design and customize any website you visit!!
// @author       GSRHackZ
// @match         *://*/*
// @grant        none
// @icon         https://www.flaticon.com/svg/1426/1426846.svg
// @require      http://code.jquery.com/jquery-latest.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @license                  MIT
// @compatible               chrome
// @compatible               firefox
// @compatible               opera
// @compatible               safari
// @noframes
// ==/UserScript==
let $ = window.jQuery;
const body=document.body;
let box=document.createElement("div"),inps,colorSwitch=false,currentBg,rainbowTxt="Rainbow-Mode!";
const btn_style=`position:fixed;bottom:10px;right:10px;width:110px;text-align:center;border:1px solid lightgrey;border-radius:5px;z-index:2000;background:white;color:black;font-size:15px;padding:5px;cursor:pointer;transition:.6s;font-family: “Helvetica Neue”,Helvetica,Arial,sans-serif;word-break:none;word-wrap:none;white-space:nowrap`;
const box_style=`color:black;position:fixed;top:10px;right:10px;width:200px;height:fit-content;border:1px solid lightgrey;background:white;transition:.6s;border-radius:5px;font-family: “Helvetica Neue”,Helvetica,Arial,sans-serif;word-break:none;word-wrap:none;text-align:center;padding:5px;z-index:2000;`;
let box_state="btn";
box.innerText="Customize 🎨";
box.style=btn_style;
body.append(box);
box.className="box-customizer";
box=document.getElementsByClassName("box-customizer")[0];
$(box).draggable();

box.addEventListener("click",function(){
    if(box_state=="btn"){
        box_state="box";
        box.innerText="";
        box.style=box_style;
        box.innerHTML=`<h1 style="font-size:20px;margin:10px;">Customize 🎨</h1><span style="margin-top:20px;width:100%;height:100%;"><br><input customize="txt-color" class="inp-customizer" placeholder="Custom-text-color..." /><br><input customize="txt-font" class="inp-customizer" placeholder="Custom-text-font..." /><br><input customize="bg-color" class="inp-customizer" placeholder="Custom-background-color..." /><br><button id="customize" style="font-size:15px;color:white;border:1px solid lightgrey;width:90%;outline:none;padding:5px;border-radius:5px;margin:10px;cursor:pointer;background:aqua;margin-bottom:25px;">Set Styling!</button><button id="rainbow" style="font-size:15px;color:white;border:none;width:90%;outline:none;padding:5px;border-radius:5px;margin:5px;cursor:pointer;background:springgreen">${rainbowTxt}</button><button id="reset" style="font-size:15px;color:white;border:1px solid lightgrey;width:90%;outline:none;padding:5px;border-radius:5px;margin:5px;cursor:pointer;background:red">Reset</button></span><p id="close-customizer" style="color:red;cursor:pointer;margin-top:40px;">Close</p>`;
        let closeBtn=document.getElementById("close-customizer");
        let reset=document.getElementById("reset");
        let rainbow=document.getElementById("rainbow");
        inps=document.getElementsByClassName("inp-customizer");
        let customize=document.getElementById("customize");
        reset.addEventListener("click",function(){
            let check=confirm("Are you sure you want to reset?");
            if(check){
                localStorage.removeItem("bg");
                localStorage.removeItem("txtColor");
                localStorage.removeItem("txtFont");
                location.reload();
            }
        })
        customize.addEventListener("click",function(){
            if(inps[2].value.trim().length>0){
                body.style.background=inps[2].value;
                localStorage.setItem("bg",inps[2].value)
            }
            if(inps[0].value.trim().length>0){
                body.style.color=inps[0].value;
                localStorage.setItem("txtColor",inps[0].value)
            }
            if(inps[1].value.trim().length>0){
                body.style.fontFamily=inps[1].value;
                localStorage.setItem("txtFont",inps[1].value)
            }
        })
        rainbow.addEventListener("click",function(){
            if(!colorSwitch){
                currentBg=body.style.background;
                this.innerText="Turn-Off!";
                rainbowTxt="Turn-Off!"
                colorSwitch=setInterval(function(){
                    body.style=`background:${randomHSL()};transition:.5s;`;
                },500);
            }
            else{
                clearInterval(colorSwitch);
                this.innerText="Rainbow-Mode!";
                rainbowTxt="Rainbow-Mode!";
                body.style.background=currentBg;
                colorSwitch=false;
            }
        })
        for(let i=0;i<inps.length;i++){
            inps[i].style=`font-size:13px;background:white;color:black;border:1px solid lightgrey;width:90%;outline:none;padding:5px;padding-left:6px;border-radius:5px;margin:5px;`;
        }
        closeBtn.addEventListener("click",function(){
            box.innerHTML="";
            box.innerText="Customize 🎨";
            box.style=btn_style;
            setTimeout(function(){
                box_state="btn";
            },500)
        })
    }
})




if(localStorage.getItem("bg")!==null){
    body.style.background=localStorage.getItem("bg");
}
if(localStorage.getItem("txtColor")!==null){
    body.style.color=localStorage.getItem("txtColor");
}
if(localStorage.getItem("txtFont")!==null){
    body.style.fontFamily=localStorage.getItem("txtFont");
}


function randomHSL(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
