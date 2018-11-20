import {Component, OnInit} from '@angular/core';
import {GetLogService} from '../../service/logService/get-log.service';
import {Page} from '../../entity/page';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  page: Page;
  records: Array<any>;
  startDate: string;
  endDate: string;


  constructor(
    private getlog: GetLogService
  ) {
  }

  ngOnInit() {
    this.page = new Page({currtNum: 1});
    this.getdata();
  }

  getdata() {
    this.getlog.getLog(this.page.currentPage, this.page.currtNum, this.startDate, this.endDate).subscribe(res => {
      this.records = res.rows;
      this.page.totleNum = res.total;
      this.page.pageCount = Math.ceil(res['total'] / this.page.currtNum);
      this.page.startNum = ((this.page.currentPage - 1) * this.page.currtNum) + 1;
      this.page.getCurrtNum = this.page.startNum - 1 + res.rows.length;
    });
  }
  select() {
    this.getdata();
  }

}
