import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

//Con el 'provideIn' se indica que el servicio sera inyectado en root disponible globalmente
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = "m6EWCsWD3IaB3Up0nE2ZiMFLKxAawABA";
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse( localStorage.getItem("historial")! ) || [];
    
    // Codigo en seguida equivalente a lo hecho en la anterior

    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem("historial")! );
    // }

    let ultimaBusqueda = localStorage.getItem("ultima_busqueda");
    if(ultimaBusqueda !== null){
      this.buscarGifs(ultimaBusqueda);
    }

  }

  buscarGifs( query: string ){

    query  = query.toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial", JSON.stringify(this._historial) );
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('q', query)
          .set('limit', '10');

    console.log(params);

    //el suscribe se ejecuta cuando se tiene la resolucion del 'get'
    this.http.get<SearchGifsResponse>(`${ this.baseUrl }/search`, { params: params })
    .subscribe( ( resp )  =>{
      //console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem("ultima_busqueda", query);
    });

    /*
    //Forma de hacer una peticion http con javascript puro
    fetch('https://api.giphy.com/v1/gifs/search?api_key=m6EWCsWD3IaB3Up0nE2ZiMFLKxAawABA&q=angular')
    .then( resp => {
      resp.json().then( data =>{
        console.log(data);
      })
    })
    */    

    //console.log(this._historial);
    
  }


}
