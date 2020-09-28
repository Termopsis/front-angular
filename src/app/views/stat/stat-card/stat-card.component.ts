import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  //Текущее значение
  @Input()
  count1: any;

  //Всего
  @Input()
  count2: any;

  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }

}
