import {Component, OnInit} from '@angular/core';
import {GetLogService} from '../../service/logService/get-log.service';
import {Page} from '../../entity/page';
import {Records} from '../../entity/records';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  total: number;

  pageNum: number;

  pageSize: number;

  records: Array<Records> = []; // 日志记录，对象集合

  startValue: Date; // 开始时间

  endValue: Date; // 结束时间

  endOpen = false;

  isVisible = false;

  currentItem: Records;

  showModal(item: Records): void {
    this.isVisible = true;
    this.currentItem = item;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

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
    private getlogservice: GetLogService
  ) {
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageNum = 1;
    this.getdata();
  }

  /**
   * 获取日志记录数据
   */
  getdata() {
    this.getlogservice.getLog(this.pageNum, this.pageSize, this.startValue, this.endValue)
      .subscribe(res => {
        // 获取数据
        this.Pages(res);
      });
  }

  // 查询按钮
  select() {
    this.getdata();
  }

  Pages(res) {
    this.pageNum = res.pageNum;
    this.pageSize = res.pageSize;
    this.total = res.total;
    this.records = res.rows;
  }
}
