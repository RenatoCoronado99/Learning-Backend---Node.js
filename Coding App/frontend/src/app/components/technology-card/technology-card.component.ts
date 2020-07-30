import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technology-card',
  templateUrl: './technology-card.component.html',
  styleUrls: ['./technology-card.component.css']
})
export class TechnologyCardComponent implements OnInit {

  //Cuando se llame a este componente para ser renderiazo, se le debe pasar un atributo technology. Similar a el onBindViewHolder de Android.
  @Input() technology: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
