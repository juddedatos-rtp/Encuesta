const scriptURL = "https://script.google.com/macros/s/AKfycbyHaaAI1gXD4lsrjvhdZDh3F7n19q5y26UMdkL1BVq7DlRVnJMkcKcBGw66QTxN82ioSw/exec";

document.getElementById("formulario").addEventListener("submit", async function(e){

e.preventDefault();

let form = e.target;
let formData = new FormData(form);

let file = document.getElementById("foto").files[0];

try{

if(file){

let reader = new FileReader();

reader.onload = async function(){

formData.append("foto", reader.result);

await fetch(scriptURL,{
method:"POST",
mode:"no-cors",
body:formData
});

alert("Formulario enviado correctamente");
form.reset();

};

reader.readAsDataURL(file);

}else{

await fetch(scriptURL,{
method:"POST",
mode:"no-cors",
body:formData
});

alert("Formulario enviado correctamente");
form.reset();

}

}catch(error){

console.error("Error:", error);
alert("Error al enviar el formulario");

}

});