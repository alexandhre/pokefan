import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  public numeroPokemon: any;
  public result: any;
  public public_image: any;
  public mainType: any;
  public items: any = [];
  public tipos: any = [];
  public error: any;
  public msgError: any;

  constructor(    
    public globalService: GlobalService
  ) {
    this.public_image = '../../../../assets/images/default.jpg';
    this.tipos = JSON.parse(sessionStorage.getItem('tipos'));
    this.msgError = "";
    this.error = "hide-error";
  }

  ngOnInit(): void {
    this.numeroPokemon = sessionStorage.getItem('idPokemon');
    this.getPokemon(this.numeroPokemon);             
  }

  titleize(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  }

  public async getPokemon(nomePokemon): Promise<void> {
    this.result = '';
    try {
      this.result = await this.globalService.buscarPokemon<any>({
        url: `${environment.application}pokemon/` + this.numeroPokemon
      });
          this.items = [];
          let numero = this.result.id;
          let fraquezas = '';
          if (numero.toString().length == 1) {
            this.result.numero = "00" + numero;
          } else if (numero.toString().length == 2) {
            this.result.numero = "0" + numero;
          } else {
            this.result.numero = this.result.id;
          }
          if (this.result.numero > 807) {
            this.public_image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.result.numero + ".png";
          } else {
            this.public_image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + this.result.numero + ".png";
          }
          this.result.nome = this.titleize(this.result.forms[0].name);        
          fraquezas = this.tipos.filter(x => x.nome == this.result.types[0].type.name);
          console.log(fraquezas);
          this.mainType = this.result.types[0].type.name;
          this.result.fraquezas = fraquezas[0]['desvantagem'];
          this.items.push(this.result);
    } catch (error) {
      this.error = "show-error";
      this.msgError = "Não foi encontrado nenhum Pokemon com esse número ou nome fornecido!";
    }
  }

}
