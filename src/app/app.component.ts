import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: String = "Pokefan";
  public numeroPokemon: any;
  public public_image: any;
  public items: any = [
    {
      'nome':'water',
      'vantagem':'Fogo, Terra e Rocha',
      'desvantagem':'Elétrico, Dragão e Grama',
    },
    {
      'nome':'dragon',
      'vantagem':'Dragão',
      'desvantagem':'Fada, Dragão e Gelo',
    },
    {
      'nome':'electric',
      'vantagem':'Água e Voador',
      'desvantagem':'Terra e Rocha',
    },
    {
      'nome':'ghost',
      'vantagem':'Psíquico, Normal, Lutador e Fantasma',
      'desvantagem':'Noturno e Fantasma',
    },
    {
      'nome':'fairy',
      'vantagem':'Lutador, Noturno e Dragão',
      'desvantagem':'Venenoso, Fogo e Metálico',
    },
    {
      'nome':'dragon',
      'vantagem':'Dragão',
      'desvantagem':'Fada, Dragão e Gelo',
    },
    {
      'nome':'fire',
      'vantagem':'Grama, Metálico, Inseto e Gelo',
      'desvantagem':'Água, Terra, Dragão e Rocha',
    },
    {
      'nome':'ice',
      'vantagem':'Grama, Terra, Dragão, Voador e Inseto',
      'desvantagem':'Fogo, Água, Rocha, Lutador e Metálico',
    },
    {
      'nome':'grass',
      'vantagem':'Água, Terra e Rocha',
      'desvantagem':'Fogo, Voador, Venenoso, Gelo, Inseto, Dragão e Metálico',
    },
    {
      'nome':'bug',
      'vantagem':'Grama, Noturno e Psíquico',
      'desvantagem':'Fogo, Voador, Rocha, Fada, Venenoso, Gelo e Metálico',
    },
    {
      'nome':'fighting',
      'vantagem':'Gelo, Terra, Rocha, Noturno, Normal, Metálico',
      'desvantagem':'Voador, Fada, Venenoso, Psíquico e Inseto',
    },
    {
      'nome':'steel',
      'vantagem':'Gelo, Rocha, Fada e Normal',
      'desvantagem':'Terra, Lutador, Elétrico, Água e Fogo',
    },
    {
      'nome':'normal',
      'vantagem':'Nenhum',
      'desvantagem':'Lutador, Metálico, Rocha e Fantasma',
    },
    {
      'nome':'dark',
      'vantagem':'Fantasma e Psíquico',
      'desvantagem':'Noturno, Fada e Lutador',
    },
    {
      'nome':'psychic',
      'vantagem':'Venenoso e Lutador',
      'desvantagem':'Fantasma, Metálico, Psíquico e Inseto',
    },
    {
      'nome':'rock',
      'vantagem':'Voador, Elétrico, Venenoso, Inseto, Fogo e Normal',
      'desvantagem':'Lutador, Terra, Metálico, Grama, Água e Gelo',
    },
    {
      'nome':'ground',
      'vantagem':'Elétrico, Metálico, Fogo, Pedra e Venenoso',
      'desvantagem':'Água, Gelo, Lutador e Grama',
    },
    {
      'nome':'poison',
      'vantagem':'Grama, Lutador e Fada',
      'desvantagem':'Terra, Fantasma, Venenoso e Psíquico',
    },
    {
      'nome':'flying',
      'vantagem':'Grama, Inseto e Lutador',
      'desvantagem':'Rocha, Metálico e Elétrico',
    }
  ];

  constructor(    
  ) {     
    this.public_image = '../../../../assets/images/default.jpg'
  }

  ngOnInit(): void {  
    sessionStorage.setItem('tipos',JSON.stringify(this.items));  
  }
}
