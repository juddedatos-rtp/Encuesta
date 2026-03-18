const scriptURL = "https://script.google.com/macros/s/AKfycbzNOQVYdrA965aW8pQwGaMElraVXDVeNPiGRsMJuxF-XH_GCZWWMuqMPL9PbMGyMnZkVg/exec";

document.getElementById("formulario").addEventListener("submit", async function(e){
  e.preventDefault();

  let form = e.target;

  // Obtener insumos (checkbox)
  let insumosSeleccionados = [];
  document.querySelectorAll('input[name="insumos"]:checked').forEach(el => {
    insumosSeleccionados.push(el.value);
  });

  let file = document.getElementById("foto").files[0];
  let fotoBase64 = "";

  if(file){
    fotoBase64 = await convertirBase64(file);
  }

  let datos = {
    cierre: form.cierre.value,
    horario: form.horario.value,
    trabajador: form.trabajador.value,
    insumos: insumosSeleccionados.join(", "),
    observaciones: form.observaciones.value,
    foto: fotoBase64
  };

  try{
    await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    });

    alert("Formulario enviado correctamente");
    form.reset();

  } catch(error){
    console.error(error);
    alert("Error real al enviar");
  }
});

// Convertir imagen a base64
function convertirBase64(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
