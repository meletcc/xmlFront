import {Component, OnInit} from '@angular/core';
import {FullbackServiceService} from '../../service/fullbackService/fullback-service.service';
import {Page} from '../../entity/page';

@Component({
  selector: 'app-full-back',
  templateUrl: './full-back.component.html',
  styleUrls: ['./full-back.component.css']
})
export class FullBackComponent implements OnInit {

  page: Page;
  records: Array<any>;
  startDate: String = '';
  endDate: String = '';

  constructor(
    private fullbackservice: FullbackServiceService
  ) {
  }

  ngOnInit() {
    this.page = new Page({currtNum: 1});
    this.getdata();
  }

  getdata() {
    if (this.startDate !== '') {
      this.startDate = this.startDate.replace('T', ' ');
    }
    if (this.endDate !== '') {
      this.endDate = this.endDate.replace('T', ' ');
    }
    this.fullbackservice.getLog(this.page.currentPage, this.page.currtNum, this.startDate, this.endDate).subscribe(res => {
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
