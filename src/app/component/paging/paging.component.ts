import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {

  @Output() getdata = new EventEmitter<void>();

  constructor() {
  }

  slectValue: any;
  @Input() page;
  @Input() pageArr;
  pagearrSel = '1';
  @Input() countArr: any;
  arrFirst: any;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.countArr) {
      this.countArr = [15, 30, 50, 100];
    }
    this.arrFirst = this.countArr.shift();
    this.slectValue = this.arrFirst;
  }

  selChange() {
    this.page.currentPage = 1;
    this.page.currtNum = Number(this.slectValue);
    this.getdata.emit();
  }

  go() {
    this.page.currentPage = Number(this.pagearrSel);
    this.getdata.emit();
  }

  changepage(type) {
    const that = this;
    switch (type) {
      case 1:
        that.page.currentPage = 1;
        that.getdata.emit();
        break;
      case 2:
        if (that.page.currentPage > 1) {
          that.page.currentPage--;
        }
        that.getdata.emit();
        break;
      case 3:
        if (that.page.currentPage < that.page.pageCount) {
          that.page.currentPage++;
        }
        that.getdata.emit();
        break;
      case 4:
        that.page.currentPage = that.page.pageCount;
        that.getdata.emit();
        break;
    }

  }
}
