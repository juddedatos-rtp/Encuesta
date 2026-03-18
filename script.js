const scriptURL = "https://script.google.com/macros/s/AKfycbxSiRIHKbxmWAHG-gYQJ2Vb_ZxaNV_iy0QCVkgYweo1oUMpx_u-04uMosRv4mvLZkwFWQ/exec";

document.getElementById("formulario").addEventListener("submit", function(e){
  e.preventDefault();

  let form = e.target;

  let insumos = [];
  document.querySelectorAll('input[name="insumos"]:checked').forEach(el=>{
    insumos.push(el.value);
  });

  let file = document.getElementById("foto").files[0];

  let formData = new FormData();
  formData.append("cierre", form.cierre.value);
  formData.append("horario", form.horario.value);
  formData.append("trabajador", form.trabajador.value);
  formData.append("insumos", insumos.join(", "));
  formData.append("observaciones", form.observaciones.value);

  if(file){
    let reader = new FileReader();
    reader.onload = function(){
      formData.append("foto", reader.result);
      enviar(formData);
    };
    reader.readAsDataURL(file);
  } else {
    enviar(formData);
  }
});

function enviar(formData){
  fetch(scriptURL, {
    method: "POST",
    body: formData,
    mode: "no-cors" // 🔥 CLAVE
  });

  alert("Formulario enviado correctamente");
  document.getElementById("formulario").reset();
}
