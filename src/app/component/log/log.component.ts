import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  page: number;
  limit: number;


  constructor() {
  }

  ngOnInit() {
    this.page = 1;
    this.limit = 20;
  }

}
