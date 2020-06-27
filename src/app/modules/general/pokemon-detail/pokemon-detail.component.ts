import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  public numeroPokemon: any;
  public public_image: any;
  public mainType: any;
  public items: any = [];
  public tipos: any = [];

  constructor(
    private _Activatedroute: ActivatedRoute,
    public globalService: GlobalService
  ) {
    this.public_image = '../../../../assets/images/default.jpg';
    this.tipos = JSON.parse(sessionStorage.getItem('tipos'));
  }

  ngOnInit(): void {
    this.numeroPokemon = this._Activatedroute.snapshot.paramMap.get("id");
    this.globalService.buscarPokemon(this.numeroPokemon)
      .subscribe(res => {
        this.items = [];
        let numero = res.id;
        let fraquezas = '';
        if (numero.toString().length == 1) {
          res.numero = "00" + numero;
        } else if (numero.toString().length == 2) {
          res.numero = "0" + numero;
        } else {
          res.numero = res.id;
        }
        if (res.numero > 807) {
          this.public_image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + res.numero + ".png";
        } else {
          this.public_image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + res.numero + ".png";
        }
        res.nome = this.titleize(res.forms[0].name);        
        fraquezas = this.tipos.filter(x => x.nome == res.types[0].type.name);
        console.log(fraquezas);
        this.mainType = res.types[0].type.name;
        res.fraquezas = fraquezas[0]['desvantagem'];
        this.items.push(res);
      }, err => {
        alert(err);
      });
  }

  titleize(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
      var w = words[a];
      words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
  }

}
