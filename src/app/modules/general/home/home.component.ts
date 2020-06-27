import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nomeNumeroPokemon: any;
  public hide: any;
  public error: any;   
  public msgError: any; 
  public idPokemon: any;
  public items: any = [];
  public prevLink: any;
  public nextLink: any;

  constructor(
    public globalService: GlobalService) {
      this.hide = "";
      this.msgError = "";
      this.error = "hide-error";
      this.nomeNumeroPokemon = "";
     }

  ngOnInit() {
    this.error = "hide-error";
    this.refreshPage();
  }

  buscarPokemon() {
    this.hide = 'hide'; 
    this.error = "hide-error";
    this.items = [];    
    if(this.nomeNumeroPokemon != "" || this.nomeNumeroPokemon != ''){
      this.globalService.buscarPokemon(this.nomeNumeroPokemon)
      .subscribe(res => {              
        let numero = res.id;
        if (numero.toString().length == 1) {
          res.numero = "00" + numero;
        } else if (numero.toString().length == 2) {
          res.numero = "0" + numero;
        }else{
          res.numero = numero; 
        }
        if(res.numero > 807){
          res.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + res.numero + ".png";
        }else{
          res.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + res.numero + ".png";       
        }
        res.nome = this.titleize(res.forms[0].name);
        this.items.push(res);
      }, err => {
        this.error = "show-error"; 
        this.msgError = "Não foi encontrado nenhum Pokemon com esse número ou nome fornecido!";              
      });
    }else{      
      this.hide = ''; 
      this.refreshPage();
    }   
  }

  titleize(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  }

  nextPage (){
    this.error = "hide-error";
    if(this.nextLink != null){
      this.globalService.carregarMais(this.nextLink)
      .subscribe(res => {
        this.items = [];
        this.prevLink = res.previous
        this.nextLink = res.next;
        for (var i = 0; i < res.results.length; i++) {
          let url = '';
          let numero = [];
          res.results[i].nome = this.titleize(res.results[i].name);
          url = res.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
          numero = url[1].split("/");
          res.results[i].id = numero[0].toString();                 
          if (numero[0].toString().length == 1) {
            res.results[i].numero = "00" + numero[0];
          } else if (numero[0].toString().length == 2) {
            res.results[i].numero = "0" + numero[0];
          }else{
            res.results[i].numero = res.results[i].id; 
          } 
          if(res.results[i].numero > 807){
            res.results[i].image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + res.results[i].numero + ".png";
          }else{
            res.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + res.results[i].numero + ".png";       
          }
          this.items.push(res.results[i]);
        }        
      }, err => {
        this.refreshPage();
      });  
    }else{
      this.error = "show-error"; 
      this.msgError = "Sem mais resultados a serem exibidos!"; 
    }   
  }

  prevPage (){
    this.error = "hide-error";
    if(this.prevLink != null){
    this.globalService.carregarMais(this.prevLink)
      .subscribe(res => {
        this.items = [];
        this.prevLink = res.previous
        this.nextLink = res.next;
        for (var i = 0; i < res.results.length; i++) {
          let url = '';
          let numero = [];
          res.results[i].nome = this.titleize(res.results[i].name);
          url = res.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
          numero = url[1].split("/");
          res.results[i].id = numero[0].toString();
          if (numero[0].toString().length == 1) {
            res.results[i].numero = "00" + numero[0];
          } else if (numero[0].toString().length == 2) {
            res.results[i].numero = "0" + numero[0];
          }else{
            res.results[i].numero = res.results[i].id; 
          } 
          res.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + res.results[i].numero + ".png";       
          this.items.push(res.results[i]);
        }        
      }, err => {
        this.refreshPage();
      });
    }else{
      this.error = "show-error"; 
      this.msgError = "Sem mais resultados a serem exibidos!";       
    }
  }

  pokemonDetalhes(idPokemon) {
    this.globalService.buscarPokemon(this.idPokemon)
      .subscribe(res => {
        
      }, err => {
        alert(err);
      });
  }

  refreshPage(){
    this.globalService.listarPokemons()
      .subscribe(res => {
        this.prevLink = res.previous
        this.nextLink = res.next;
        for (var i = 0; i < res.results.length; i++) {
          let url = '';
          let numero = [];
          res.results[i].nome = this.titleize(res.results[i].name);
          url = res.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
          numero = url[1].split("/");          
          res.results[i].id = numero[0].toString();
          if (numero[0].toString().length == 1) {
            res.results[i].numero = "00" + numero[0];
          } else if (numero[0].toString().length == 2) {
            res.results[i].numero = "0" + numero[0];
          }else{
            res.results[i].numero = res.results[i].id; 
          }          
          res.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + res.results[i].numero + ".png";       
          this.items.push(res.results[i]);
        }     
                 
      }, err => {
        alert(err);
      });
  }

}
