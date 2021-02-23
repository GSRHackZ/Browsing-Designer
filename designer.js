// ==UserScript==
// @name         Browsing Designer
// @namespace    http://tampermonkey.net/
// @version      1.5
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
var j = $.noConflict();
const body=document.body;
let btn_style=`position:fixed;right:10px;bottom:10px;transition:.2s;font-size:15px;box-sizing:border-box;padding:5px;color:black;background:white;border:1px solid lightgrey;border-radius:5px;cursor:pointer;height:fit-content;width:fit-content;z-index:20000000000;font-family: “Helvetica Neue”,Helvetica,Arial,sans-serif;`;
let box_style=`text-align:center;position:fixed;right:10px;top:10px;transition:.6s;border-box;padding:5px;color:black;background:white;border:1px solid lightgrey;border-radius:5px;width:200px;cursor:default;height:fit-content;z-index:200000000000;font-family: “Helvetica Neue”,Helvetica,Arial,sans-serif;`;
let box=document.createElement("div");
let inps,rainbowTxt="Rainbow-Mode! 🌈",colorSwitch=false,currentBg;
box.innerText="Customize 🎨";
box.style=btn_style;
let box_state="btn";
j(box).draggable();
body.append(box);

box.addEventListener("click",function(){
    if(box_state=="btn"){
        this.style=box_style;
        this.innerText="";
        box_state="box";
        this.innerHTML=`
        <h1 style="font-size:18px;margin:10px;margin-bottom:30px;">Customize 🎨</h1>
        <div style="text-align:left;margin-top:20px;width:100%;height:fit-content;margin-bottom:20px;">
           <input name="txtFont" placeholder="Enter font here..." class="inp-customizer" type="text"/><br>
           <input title="Text-Color" name="txtColor" value=#09FB7E class="inp-customizer picker" type="color"/><br>
           <input title="Background-Color" name="bgColor" value=#eb8aff class="inp-customizer picker" type="color"/><br>
        </div>
        <div style="width:100%;height:fit-content;margin-bottom:40px;">
           <button id="rainbow" style="font-size:15px;color:white;border:1px solid lightgrey;width:90%;outline:none;padding:5px;border-radius:5px;margin:5px;cursor:pointer;background:#be7afc">${rainbowTxt}</button><br>
           <button id="random" style="font-size:15px;color:white;border:1px solid lightgrey;width:90%;outline:none;padding:5px;border-radius:5px;margin:5px;cursor:pointer;background:#1b8df7">Random - Design 🤞</button><br>
        </div>
        <center>
        <div style="width:93%;height:fit-content;margin-bottom:30px;border-radius:5px;">
            <button id="reset" style="font-size:15px;color:white;border:1px solid lightgrey;width:90%;outline:none;padding:5px;border-radius:5px;margin:5px;cursor:pointer;background:red">Reset</button>
            <p id="close-customizer" style="color:red;cursor:pointer;margin-top:20px;">Close</p>
        </div>
        </center>
`;
        inps=document.getElementsByClassName("inp-customizer");
        let colorPickers=document.getElementsByClassName("picker");
        let rainbow=document.getElementById("rainbow");
        let closeBtn=document.getElementById("close-customizer");
        let reset=document.getElementById("reset");
        let randomBtn=document.getElementById("random");
        randomBtn.addEventListener("click",function(){
            body.style=`background:${randomThing("color")};font-family:${randomThing("font")};color:${randomThing("color")};transition:.6s;`;
            localStorage.setItem("bg",body.style.background)
            localStorage.setItem("txtColor",body.style.color)
            localStorage.setItem("txtFont",body.style.fontFamily)
        })
        reset.addEventListener("click",function(){
            let check=confirm("Are you sure you want to reset?");
            if(check){
                localStorage.removeItem("bg");
                localStorage.removeItem("txtColor");
                localStorage.removeItem("txtFont");
                location.reload();
            }
        })
        rainbow.addEventListener("click",function(){
            if(!colorSwitch){
                currentBg=body.style.background;
                colorSwitch=setInterval(function(){
                    body.style=`background:${randomThing("color")};transition:.6s;`
                },500)
                this.innerText="Turn Off!";
                rainbowTxt=this.innerText;
            }
            else{
                clearInterval(colorSwitch);
                colorSwitch=false;
                this.innerText="Rainbow-Mode! 🌈";
                rainbowTxt=this.innerText;
                body.style.background=currentBg;
            }
        })
        closeBtn.addEventListener("click",function(){
            box.innerHTML="";
            box.innerText="Customize 🎨";
            box.style=btn_style;
            setTimeout(function(){
                box_state="btn";
            },500)
        })
        for(let i=0;i<inps.length;i++){
            inps[i].style=`cursor:pointer;height:25px;font-size:13px;background:white;color:black;border:1px solid lightgrey;width:90%;outline:none;padding:5px;padding-left:7px;border-radius:5px;margin:5px;margin-bottom:10px;font-family: “Helvetica Neue”,Helvetica,Arial,sans-serif;`;
            if(inps[i].name=="txtFont"){
                inps[i].style.cursor="text";
                inps[i].addEventListener("keyup",function(evt){
                    if(evt.keyCode==13){
                        body.style.fontFamily=this.value;
                        localStorage.setItem("txtFont",body.style.fontFamily)
                    }
                })
            }
        }
        for(let i=0;i<colorPickers.length;i++){
            colorPickers[i].addEventListener("input", function(){
                if(this.name=="txtColor"){
                    body.style.color=this.value;
                    localStorage.setItem("txtColor",body.style.color)

                }
                else if(this.name=="bgColor"){
                    body.style.background=this.value;
                    localStorage.setItem("bg",body.style.background)
                }
            })
        }
    }
})

box.addEventListener("contextmenu",function(evt){
    if(box_state=="btn"){
        evt.preventDefault();
        this.style.cursor="not-allowed";
        del(this);
        function del(elem){
            setTimeout(function(){
                elem.remove();
            },300)
        }
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

function randomThing(type){
    if(type=="color"){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    else if(type=="font"){
        let fonts=["Arial, sans-serif","Helvetica, sans-serif","comic sans ms","Verdana, sans-serif","Trebuchet MS, sans-serif","Gill Sans, sans-serif","Noto Sans, sans-serif","Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif","Optima, sans-serif","Arial Narrow, sans-serif","Apple Chancery, cursive","Luminari, fantasy","Marker Felt, fantasy"];
        return fonts[Math.floor(Math.random() * fonts.length)];
    }
}
