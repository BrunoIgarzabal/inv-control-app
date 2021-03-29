import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss'],
})
export class HomeCardsComponent implements OnInit {

  @Input() title: string;
  @Input() value: string;
  @Input() icon: string;
  @Input() colorClass: string;

  constructor() { }

  ngOnInit() {}

}
