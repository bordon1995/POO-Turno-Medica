import {UI} from './clases/UI.js';
import {ConeccionDB} from './clases/ConeccionDB.js';

export let ui,coneccionDB;
ui=new UI();
coneccionDB=new ConeccionDB();
var idPersona;

eventListeners();
function eventListeners(){

  document.addEventListener('DOMContentLoaded',coneccionDB.dataBase);

  document.querySelector('.formulario').addEventListener('submit',guardarDatos);

  document.querySelector('.turnos').addEventListener('click',editarFormulario);

  document.querySelector('.turnos').addEventListener('click',eliminarFormulario);

}

function guardarDatos(e){
  e.preventDefault();
  var objeto;
  if(document.querySelector('.boton').classList.contains('editar')){
      const objetoActualizado={
        nombre:document.querySelector('#nombre').value,
        apellido:document.querySelector('#apellido').value,
        telefono:document.querySelector('#telefono').value,
        fecha:document.querySelector('#fecha').value,
        hora:document.querySelector('#hora').value,
        sintomas:document.querySelector('#sintomas').value,
        id:idPersona
      };

      coneccionDB.actualizarDB(objetoActualizado);

   }else{
    objeto={
      nombre:document.querySelector('#nombre').value,
      apellido:document.querySelector('#apellido').value,
      telefono:document.querySelector('#telefono').value,
      fecha:document.querySelector('#fecha').value,
      hora:document.querySelector('#hora').value,
      sintomas:document.querySelector('#sintomas').value,
      id:Date.now()
    };
    coneccionDB.cargarDatosDB(objeto);
  }

  coneccionDB.mostrarDatos();

  document.querySelector('.formulario').reset();

}

function editarFormulario(e){
  if(e.target.classList.contains('editar')){

    document.querySelector('.boton').classList.add('editar')

    idPersona=parseInt(e.target.getAttribute('id'));

    coneccionDB.editarInformacion(idPersona)
  }
}

function eliminarFormulario(e){
   if(e.target.classList.contains('eliminar')){
    idPersona=parseInt(e.target.getAttribute('id'));

    coneccionDB.eliminar(idPersona);

  }
}