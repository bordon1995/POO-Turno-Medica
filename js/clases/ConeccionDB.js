import { ui } from "../app.js";

let DB;
export class ConeccionDB{

  dataBase(){
    let database=window.indexedDB.open('database',1);

    database.onerror=function(){
      console.log('error')
    }

    database.onsuccess=function(e){
      DB=e.target.result;
      new ConeccionDB().mostrarDatos();
    }

    database.onupgradeneeded=function(e){
      var objectstore=e.target.result.createObjectStore('database',{keyPath: 'id',autoIncrement: true});

      objectstore.createIndex('id','id',{unique:true});
      objectstore.createIndex('nombre','nombre',{unique:false});
      objectstore.createIndex('apellido','apellido',{unique:false});
      objectstore.createIndex('telefono','telefono',{unique:false});
      objectstore.createIndex('fecha','fecha',{unique:false});
      objectstore.createIndex('hora','hora',{unique:false});
      objectstore.createIndex('sintomas','sintomas',{unique:false});
    }
  }

  cargarDatosDB(element){

    var transaction=DB.transaction(['database'],'readwrite');

    transaction.oncomplete=function(){
      console.log('completada');
    }

    transaction.onerror=function(){
      console.log('hubo un error');
    }

    var prueva=transaction.objectStore('database');

    var nuevoCliente={
      nombre:element.nombre,
      apellido:element.apellido,
      telefono:element.telefono,
      fecha:element.fecha,
      hora:element.hora,
      sintomas:element.sintomas,
      id:element.id
    };

    prueva.add(nuevoCliente);

  }

  eliminar(id){
    var delit=DB.transaction('database','readwrite').objectStore('database');

    delit.openCursor().onsuccess=(e)=>{

      var dato=e.target.result;

      if(dato){
        if(id === parseInt(dato.value.id)){
          console.log('encontrado')
          dato.delete(id);
          this.mostrarDatos();
        }

        dato.continue();

      }
    }
  }

  mostrarDatos(){
    ui.limpiarHtml();

    var mostrar=DB.transaction('database').objectStore('database');

    mostrar.openCursor().onsuccess=function(e){
      const cursor=e.target.result;

      if(cursor){
        const {nombre,apellido,telefono,fecha,hora,sintomas,id}=cursor.value;

        ui.mostrarTurnos(nombre,apellido,telefono,fecha,hora,sintomas,id);

        cursor.continue();
      }
    }
  }

  editarInformacion(id){
    var mostrar=DB.transaction('database').objectStore('database');

    mostrar.openCursor().onsuccess=function(e){
      const cursor=e.target.result;

      if(cursor){
        if(id === parseInt(cursor.value.id)){

          const {nombre,apellido,telefono,fecha,hora,sintomas}=cursor.value;

          ui.editarInformacion(nombre,apellido,telefono,fecha,hora,sintomas);

        }

        cursor.continue();
      }
    }

  }

  actualizarDB(objetoActualizado){

    var mostrar=DB.transaction('database','readwrite').objectStore('database');

    mostrar.openCursor().onsuccess=function(e){
      const cursor=e.target.result;

      console.log(objetoActualizado.id)
      if(cursor){
        if(objetoActualizado.id === parseInt(cursor.value.id)){

          mostrar.put(objetoActualizado);

        }

        cursor.continue();

      }
    }
  }
}


