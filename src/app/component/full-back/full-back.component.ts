import {Component, OnInit} from '@angular/core';
import {FullbackServiceService} from '../../service/fullbackService/fullback-service.service';
import {Fullback} from '../../entity/fullback';

@Component({
  selector: 'app-full-back',
  templateUrl: './full-back.component.html',
  styleUrls: ['./full-back.component.css']
})
export class FullBackComponent implements OnInit {

  total: number;

  pageNum: number;

  pageSize: number;

  records: Array<Fullback>;

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
    this.pageSize = 10;
    this.pageNum = 1;
    this.getdata();
  }

  getdata() {
    // this.page.totleNum = res.total;
    // this.page.pageCount = Math.ceil(res['total'] / this.page.currtNum);
    // this.page.startNum = ((this.page.currentPage - 1) * this.page.currtNum) + 1;
    // this.page.getCurrtNum = this.page.startNum - 1 + res.rows.length;
    this.fullbackservice.getLog(this.pageNum, this.pageSize, this.startValue, this.endValue)
      .subscribe(res => {
        // 获取数据
        this.Pages(res);
      });
  }

  select() {
    this.getdata();
  }

  Pages(res) {
    this.pageNum = res.pageNum;
    this.pageSize = res.pageSize;
    this.total = res.total;
    this.records = res.rows;
  }

  /**
   * 删除按钮
   */
  // del(fullBackupId: string) {
  //   this.delservice.delfullback(fullBackupId).subscribe(res => {
  //     if (res.code === 0) {
  //       alert('删除成功');
  //     } else {
  //       alert('删除失败');
  //     }
  //   }, err => {
  //     console.log(err);
  //   });
  // }
}
