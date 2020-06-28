import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public nomeNumeroPokemon: any;
  public result: any;
  public hide: any;
  public error: any;
  public msgError: any;
  public idPokemon: any;
  public items: any = [];
  public prevLink: any;
  public nextLink: any;

  constructor(
    public globalService: GlobalService,    
  ) {
    this.hide = "";
    this.msgError = "";
    this.error = "hide-error";
    this.nomeNumeroPokemon = "";
  }

  ngOnInit() {
    this.error = "hide-error";
    this.hide = 'hide';
    this.refreshPage();
  }

  public async buscarPokemon(): Promise<void> {
    this.result = '';
    this.hide = 'hide';
    this.error = "hide-error";
    this.items = [];
    if (this.nomeNumeroPokemon != "" || this.nomeNumeroPokemon != '') {
      try {
        this.result = await this.globalService.buscarPokemon<any>({
          url: `${environment.application}pokemon/` + this.nomeNumeroPokemon
        });
        let numero = this.result.id;
        if (numero.toString().length == 1) {
          this.result.numero = "00" + numero;
        } else if (numero.toString().length == 2) {
          this.result.numero = "0" + numero;
        } else {
          this.result.numero = numero;
        }
        if (this.result.numero > 807) {
          this.result.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.result.numero + ".png";
        } else {
          this.result.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.result.numero + ".png";
        }
        this.result.nome = this.titleize(this.result.forms[0].name);
        this.items.push(this.result);
      } catch (error) {
        this.error = "show-error";
        this.msgError = "Não foi encontrado nenhum Pokemon com esse número ou nome fornecido!";
      }
    } else {
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

  public async nextPage(): Promise<void> {
    this.result = '';
    this.error = "hide-error";
    if (this.nextLink != null) {
      try {
        this.result = await this.globalService.buscarPokemon<any>({
          url: this.nextLink
        });
        this.items = [];
        this.prevLink = this.result.previous
        this.nextLink = this.result.next;
        for (var i = 0; i < this.result.results.length; i++) {
          let url = '';
          let numero = [];
          this.result.results[i].nome = this.titleize(this.result.results[i].name);
          url = this.result.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
          numero = url[1].split("/");
          this.result.results[i].id = numero[0].toString();
          if (numero[0].toString().length == 1) {
            this.result.results[i].numero = "00" + numero[0];
          } else if (numero[0].toString().length == 2) {
            this.result.results[i].numero = "0" + numero[0];
          } else {
            this.result.results[i].numero = this.result.results[i].id;
          }
          if (this.result.results[i].numero > 807) {
            this.result.results[i].image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.result.results[i].numero + ".png";
          } else {
            this.result.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.result.results[i].numero + ".png";
          }
          this.items.push(this.result.results[i]);
        }
      } catch (error) {
        this.refreshPage;
      }
    } else {
      this.error = "show-error";
      this.msgError = "Sem mais resultados a serem exibidos!";
    }
  }

  public async prevPage(): Promise<void> {
    this.result = '';
    this.error = "hide-error";
    if (this.prevLink != null) {
      try {
        this.result = await this.globalService.buscarPokemon<any>({
          url: this.prevLink
        });
        this.items = [];
        this.prevLink = this.result.previous
        this.nextLink = this.result.next;
        for (var i = 0; i < this.result.results.length; i++) {
          let url = '';
          let numero = [];
          this.result.results[i].nome = this.titleize(this.result.results[i].name);
          url = this.result.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
          numero = url[1].split("/");
          this.result.results[i].id = numero[0].toString();
          if (numero[0].toString().length == 1) {
            this.result.results[i].numero = "00" + numero[0];
          } else if (numero[0].toString().length == 2) {
            this.result.results[i].numero = "0" + numero[0];
          } else {
            this.result.results[i].numero = this.result.results[i].id;
          }
          this.result.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.result.results[i].numero + ".png";
          this.items.push(this.result.results[i]);
        }
      } catch (error) {
        this.refreshPage;
      }
    } else {
      this.error = "show-error";
      this.msgError = "Sem mais resultados a serem exibidos!";
    }
  }

  pokemonDetalhes(idPokemon) {
    sessionStorage.setItem('idPokemon', idPokemon);
    window.open('/detail/' + idPokemon,"_self");
  }

  public async refreshPage(): Promise<void> {
    this.result = '';
    try {
      this.result = await this.globalService.buscarPokemon<any>({
        url: `${environment.application}pokemon?limit=12&offset=0`
      });
      this.prevLink = this.result.previous
      this.nextLink = this.result.next;
      for (var i = 0; i < this.result.results.length; i++) {
        let url = '';
        let numero = [];
        this.result.results[i].nome = this.titleize(this.result.results[i].name);
        url = this.result.results[i].url.split("https://pokeapi.co/api/v2/pokemon/");
        numero = url[1].split("/");
        this.result.results[i].id = numero[0].toString();
        if (numero[0].toString().length == 1) {
          this.result.results[i].numero = "00" + numero[0];
        } else if (numero[0].toString().length == 2) {
          this.result.results[i].numero = "0" + numero[0];
        } else {
          this.result.results[i].numero = this.result.results[i].id;
        }
        this.result.results[i].image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.result.results[i].numero + ".png";
        this.items.push(this.result.results[i]);
        this.hide = '';
      }
    } catch (error) {
      this.error = "show-error";
      this.msgError = "Não foi encontrado nenhum Pokemon!";
    }
  }

}
