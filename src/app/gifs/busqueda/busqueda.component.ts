import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Este decorador me permite utilizar objetos del html relacionandolos por clase, id, o id local
  // El operador '!' indica a TS que el elemento html siempre va a existir y nunca va a ser nulo
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;


  constructor(private gifsService: GifsService){}

  buscar(){
    //console.log(this.txtBuscar);
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }
    //console.log(valor);

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

  

}
