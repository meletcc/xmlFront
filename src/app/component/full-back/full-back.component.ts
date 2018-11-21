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

  startValue: Date;
  endValue: Date;
  endOpen = false;


  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  onStartChange(date: Date): void {
    this.startValue = date;
  }

  onEndChange(date: Date): void {
    this.endValue = date;
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endOpen = true;
    }
    console.log('handleStartOpenChange', open, this.endOpen);
  }

  handleEndOpenChange(open: boolean): void {
    console.log(open);
    this.endOpen = open;
  }

  constructor(
    private fullbackservice: FullbackServiceService
  ) {
  }

  ngOnInit() {
    this.page = new Page();
    this.getdata();
  }

  getdata() {
    this.fullbackservice.getLog(this.page.currentPage, this.page.currtNum, this.startValue, this.endValue).subscribe(res => {
      this.records = res.rows;
      // this.page.totleNum = res.total;
      // this.page.pageCount = Math.ceil(res['total'] / this.page.currtNum);
      // this.page.startNum = ((this.page.currentPage - 1) * this.page.currtNum) + 1;
      // this.page.getCurrtNum = this.page.startNum - 1 + res.rows.length;
    });
  }

  select() {
    this.getdata();
  }
}
