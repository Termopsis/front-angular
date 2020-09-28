import {Component, Input, OnInit} from '@angular/core';
import {DashboardData} from 'src/app/object/DashboardData';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  @Input()
  dashBoard: DashboardData;

  @Input()
  showStat: boolean;

  constructor() { }

  ngOnInit() {
  }

  getTotal(): number {
    if (this.dashBoard) {
      return this.dashBoard.completedTotal + this.dashBoard.uncompletedTotal
    }
  }

  getCompletedCount() {
    if (this.dashBoard) {
      return this.dashBoard.completedTotal;
    }
  }

  getUncompletedCount() {
    if (this.dashBoard) {
      return this.dashBoard.uncompletedTotal;
    }
  }

  getCompletedPercent() {
    if (this.dashBoard) {
      return this.dashBoard.completedTotal ? (this.dashBoard.completedTotal / this.getTotal()) : 0;
    }
  }

  getUncompletedPercent() {
    if (this.dashBoard) {
      return this.dashBoard.uncompletedTotal ? (this.dashBoard.uncompletedTotal / this.getTotal()) : 0;
    }
  }

}
