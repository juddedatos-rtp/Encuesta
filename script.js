const scriptURL = "https://script.google.com/macros/s/AKfycbws5iCUgYAOfJLRAe1naGeEE-kmxE3t7_L-oPtNQ1jxrfTQi5nfnV_vw7MNI9N-GiAhxw/exec";

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

let response = await fetch(scriptURL,{
method:"POST",
body:formData
});

console.log(await response.text());

alert("Formulario enviado correctamente");
form.reset();

};

reader.readAsDataURL(file);

}else{

let response = await fetch(scriptURL,{
method:"POST",
body:formData
});

console.log(await response.text());

alert("Formulario enviado correctamente");
form.reset();

}

}catch(error){

console.error("Error:", error);
alert("Error al enviar el formulario");

}

});