const scriptURL = "https://script.google.com/macros/s/AKfycbxSiRIHKbxmWAHG-gYQJ2Vb_ZxaNV_iy0QCVkgYweo1oUMpx_u-04uMosRv4mvLZkwFWQ/exec";

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
        await fetch(scriptURL, { method:"POST", body:formData });
        alert("Formulario enviado correctamente");
        form.reset();
      };
      reader.readAsDataURL(file);
    } else {
      await fetch(scriptURL, { method:"POST", body:formData });
      alert("Formulario enviado correctamente");
      form.reset();
    }
  } catch(error){
    console.error("Error:", error);
    alert("Error al enviar el formulario");
  }
});