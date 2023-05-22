//Javascript code to handle logic and api calls

//create variable for elements in the html code that will be used in logic
var submit = document.getElementById("submit");
var home = document.getElementById("imgHome");
var input = document.getElementById("inputdiv");
var outputdiv = document.getElementById("response");

var text = document.getElementById("text");
var array = document.getElementById("arr");

var data = document.getElementById("input");
var output = document.getElementById("output");


//create variables for the translated data after the api cal and an array to hold the array form of translation
var valdata, finaltranslation;
var finaltranslationarr = [];

//convert text to array to be stored to later be used to displayed to the user 
//translation = either string or array
//ta = 0; text to array
//ta = anything else; array to text
function textArr(translation, ta){
    if(ta == 0){
        var temp = "";
        var array = [];

        for(let i = 0; i < translation.length; i++){
            if(translation[i] == ' '){
                array.push(temp);
                temp = "";
            }else{
                temp = temp + translation[i];
            }
        }

        if(temp != "" && temp != " "){
            array.push(temp);
        }

        return array;
    }
    var textform = "[";
    
    for(let i = 0; i < translation.length; i++){
        textform = textform + "\"" + translation[i] + "\", ";
    }

    textform = textform.slice(0, -2) + "]";

    if(textform == "]"){
        return "";
    }

    return textform;
}


//make the text button code to show text form of translation
text.addEventListener("click", textB);

function textB(){
    text.style.backgroundColor = "#DBDCDD";
    array.style.backgroundColor = "#888888";


    output.value = finaltranslation;
}

//make the image button work so that it takes you to the home screen and clear all values
home.addEventListener("click", homeB);

function homeB(){
    outputdiv.style.visibility = "hidden";
    input.style.visibility = "visible";
    text.style.backgroundColor = "#DBDCDD";
    array.style.backgroundColor = "#888888";
    output.value = "";
    data.value = "Place Text Here";
    finaltranslation = "";
    finaltranslationarr = [];
}


//make the array button work to show array form of translation
array.addEventListener("click", arrayB);

function arrayB(){
    array.style.backgroundColor = "#DBDCDD";
    text.style.backgroundColor = "#888888";

    


    output.value = textArr(finaltranslationarr, 1);
}


//clear the textarea from the suggestion for the user to type
data.addEventListener("click", remove);

function remove(){
    data.value = "";
}


//make the submit button work to translate the code and display it
submit.addEventListener("click", translate);

async function translate() {

    if(data.value != ""){
        input.style.visibility = "hidden";
        outputdiv.style.visibility = "visible";
        

        var bodys = {"source_text":data.value,"target_lang":"en"};
        const bodyn = JSON.stringify(bodys);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'add00d691amsh2269587cb1989d1p16a5dfjsn36c949a16cc4',
                'X-RapidAPI-Host': 'text-translation5.p.rapidapi.com'
            },
            body: bodyn
        };
        

        valdata = await fetch('https://text-translation5.p.rapidapi.com/translate', options);
        json = await valdata.json();

        finaltranslation = json.translated_text;

        finaltranslationarr = textArr(finaltranslation, 0);


        output.value = finaltranslation;
    }
;}
