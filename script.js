const scriptURL = "https://script.google.com/macros/s/AKfycbxSiRIHKbxmWAHG-gYQJ2Vb_ZxaNV_iy0QCVkgYweo1oUMpx_u-04uMosRv4mvLZkwFWQ/exec";

document.getElementById("formulario").addEventListener("submit", function(e){
  e.preventDefault();

  let form = e.target;

  let insumos = [];
  document.querySelectorAll('input[name="insumos"]:checked').forEach(el=>{
    insumos.push(el.value);
  });

  let file = document.getElementById("foto").files[0];

  if(file){
    let reader = new FileReader();
    reader.onload = function(){
      enviarDatos(form, insumos, reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    enviarDatos(form, insumos, "");
  }
});

function enviarDatos(form, insumos, foto){

  const datos = new URLSearchParams();

  datos.append("cierre", form.cierre.value);
  datos.append("horario", form.horario.value);
  datos.append("trabajador", form.trabajador.value);
  datos.append("insumos", insumos.join(", "));
  datos.append("observaciones", form.observaciones.value);
  datos.append("foto", foto);

  fetch(scriptURL, {
    method: "POST",
    body: datos,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  alert("Formulario enviado correctamente");
  form.reset();
}
