import {Component, OnInit} from '@angular/core';
import {Page} from '../../entity/page';
import {GetLogService} from '../../service/logService/get-log.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-plugin-manager',
  templateUrl: './plugin-manager.component.html',
  styleUrls: ['./plugin-manager.component.css']
})
export class PluginManagerComponent implements OnInit {

  page: Page;
  records: Array<any>;

  startValue: Date; // 开始时间
  endValue: Date; // 结束时间
  endOpen = false;

  headerUp: HttpHeaders;

  opmEntity: OpmEntitys;

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

  constructor(private getlog: GetLogService, private client: HttpClient) {
  }

  ngOnInit() {
    this.page = new Page();
    this.getdata();
  }

  upload(files): any {
    this.opmEntity = null;
    const formData = new FormData();
    formData.append('opm', files.files[0]);
    return this.client.post<Response>('/anaOpm', formData, {headers: this.headerUp}).toPromise().then((response) => {
      if (response.code === -1) {
        alert(response.msg);
      } else {
        this.opmEntity = response.data;
      }
    });
  }

  getdata() {
    this.getlog.getLog(this.page.currentPage, this.page.currtNum, this.startValue, this.endValue).subscribe(res => {
      // 获取数据
      this.records = res.rows;
      // this.page.totleNum = res.total;
      // this.page.pageCount = Math.ceil(res['total'] / this.page.currtNum);
      // this.page.startNum = ((this.page.currentPage - 1) * this.page.currtNum) + 1;
      // this.page.getCurrtNum = this.page.startNum - 1 + res.rows.length;
    });
  }

  // 查询按钮
  select() {
    this.getdata();
  }
}

export class Response {

  code: number;

  data: OpmEntitys;

  msg: string;

  constructor(opts: {
    code?: number,
    data?: OpmEntitys,
    msg?: string
  } = {}) {
    this.code = opts.code;
    this.data = opts.data;
    this.msg = opts.msg;
  }

}

/**
 * 参数说明
 */
export class Parameters {

  name: string;

  description: string;

  type: string;

  tips: string;

  value: string;

  constructor(ops: {
    description?: string,
    name?: string,
    type?: string,
    tips?: string,
    value?: string
  } = {}) {
    this.description = ops.description;
    this.name = ops.name || '';
    this.type = ops.type || '';
    this.tips = ops.tips || '';
    this.value = ops.value || '';
  }


}

/**
 * 参数主题说明
 */
export class OpmEntitys {

  /**
   * 参数功能说明
   */
  description: string;
  /**
   * 插件主体
   */
  body: string;
  /**
   * 插件备份
   */
  back: string;
  /**
   * 插件参数{JSON格式}
   */
  params: Array<Parameters>;

  constructor(ops: {
    description?: string,
    body?: string,
    back?: string,
    params?: Array<Parameters>
  } = {}) {
    this.description = ops.description || '';
    this.body = ops.body || '';
    this.back = ops.back || '';
    this.params = ops.params || [];
  }

}
