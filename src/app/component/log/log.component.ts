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

  startValue: Date; // 开始时间
  endValue: Date; // 结束时间
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
    private getlog: GetLogService
  ) {
  }

  ngOnInit() {
    this.page = new Page();
    this.getdata();
  }

  getdata() {
    this.getlog.getLog(this.page.currentPage, this.page.currtNum, this.startValue, this.endValue).subscribe(res => {
      // 获取数据
      console.log(res);
      this.records = res.rows;
    });
  }

  // 查询按钮
  select() {
    this.getdata();
  }

}
