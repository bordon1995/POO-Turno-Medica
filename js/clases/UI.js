export class UI{
  mostrarTurnos(nombre,apellido,telefono,fecha,hora,sintomas,id){

      const html=document.createElement('div');
      html.classList.add('pacientes');
      html.innerHTML=`
      <ul><li><p class="items__parrafo"><span>nombre:</span>${nombre}</p></li><li><p class="items__parrafo"><span>apellido:</span>${apellido}</p></li><li><p class="items__parrafo"><span>telefono:</span>${telefono}</p></li><li><p class="items__parrafo"><span>fecha:</span>${fecha}</p></li><li><p class="items__parrafo"><span>hora:</span>${hora}</p></li><li><p class="items__parrafo"><span>sintomas:</span>${sintomas}</p></li></ul>
      <div class="boton2">
          <button id="${id}" class="items__boton editar" type="submit">Editar</button>
          <button id="${id}" class="items__boton eliminar" type="submit">Eliminar</button>
      </div>`
      document.querySelector('.turnos__lista').appendChild(html);
  }

  limpiarHtml(){
    while(document.querySelector('.turnos__lista').firstChild){
      document.querySelector('.turnos__lista').removeChild(document.querySelector('.turnos__lista').firstChild);
    }
  }

  editarInformacion(nombre,apellido,telefono,fecha,hora,sintomas){

    document.querySelector('#nombre').value=nombre;
    document.querySelector('#apellido').value=apellido;
    document.querySelector('#telefono').value=telefono;
    document.querySelector('#fecha').value=fecha;
    document.querySelector('#hora').value=hora;
    document.querySelector('#sintomas').value=sintomas;
    
  }

}