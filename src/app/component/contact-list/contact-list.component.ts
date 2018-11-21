import {Component, OnInit, ValueProvider} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {NgTools_InternalApi_NG2_ListLazyRoutes_Options} from '@angular/compiler-cli/src/ngtools_api';
import {promise} from 'selenium-webdriver';
import filter = promise.filter;

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  // 暂存参数集合
  parameters: Array<Parameter> = [];

  //操作实体类
  opmEntity: OpmEntity = new OpmEntity();

  //是否显示备份框
  isBackup: boolean = false;

  //错误信息
  msg: string;

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {

  }

  print() {
    console.log(this.parameters);
  }

  //获取参数列表
  acquireSql(): void {

    this.parameters = [];
    this.msg = '';

    let regex3 = /\#{(.+?)\}/g;
    let temp = [];
    let p1 = this.opmEntity.body.match(regex3);
    let p2 = this.opmEntity.back.match(regex3);

    // p2 = p2.filter(value => value == '#{name}');
    // if (p2 != null) {
    //   if (p1 == null) {
    //     this.msg = '定义备份之前，请先定义好插件代码！';
    //     return;
    //   }
    // }
    // value == '#{name}'返回位true表式 通過
    if (p1 != null) {
      p1.forEach(value => {
        temp.push(value);
      });
    }
    //去重复
    if (p2 != null) {
      p2.forEach(value => {
        let my: number = 1;
        p1.forEach(value1 => {
          if (value1 === value) {
            my = 2;
          }
        });
        if (my != 2) {
          temp.push(value);
        }
      });
    }

    //添加数据
    temp.filter((value, index) => console.log(value + index));
    if (temp != null) {
      temp.forEach(value => {
        let parameter: Parameter = new Parameter();
        parameter.name = value.substring(2, value.length - 1);
        this.parameters.push(parameter);
      });
    }

  }


  //取消或者保存备份
  backUp(): void {
    if (this.isBackup) {
      this.opmEntity.back = '';
      this.acquireSql();
      this.isBackup = false;
    } else {
      if (this.opmEntity.body == '') {
        this.msg = '定义备份之前，请先定义插件主体！';
        return;
      }
      this.isBackup = true;
    }
  }

  //保存插件
  savePlugIn(): void {
    //to do service
    if (this.opmEntity.description == '') {
      this.msg = '请输入插件说明';
      return;
    }
    if (this.opmEntity.body == '') {
      this.msg = '请输入插件主体';
      return;
    }
    if (this.parameters.length < 1) {
      this.msg = '插件主题不正确或者参数填写不完整';
      return;
    }
    if (this.parameters
      .filter(value => value.description != '')
      .filter(value => value.tips != '')
      .filter((value) => value.type != '').length === 0) {
      this.msg = '插件参数必须全部填写！';
      return;
    }
    this.opmEntity.parameterStr = JSON.stringify(this.parameters);
    this.http.post('/make', this.opmEntity, {responseType: 'blob'}).subscribe(data => {
      const link = document.createElement('a');
      const blob = new Blob([data], {type: 'application/text'});
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', this.opmEntity.description + '.opm');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

  }
}

/**
 * 参数说明
 */
export class Parameter {

  name: string;

  description: string;

  type: string;

  tips: string;

  constructor(ops: {
    description?: string,
    name?: string,
    type?: string,
    tips?: string
  } = {}) {
    this.description = ops.description;
    this.name = ops.name || '';
    this.type = ops.type || 'text';
    this.tips = ops.tips || '';
  }

}

/**
 * 参数主题说明
 */
export class OpmEntity {

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
  parameterStr: string;

  constructor(ops: {
    description?: string,
    body?: string,
    back?: string,
    parameterStr?: string
  } = {}) {
    this.description = ops.description || '';
    this.body = ops.body || '';
    this.back = ops.back || '';
    this.parameterStr = ops.parameterStr || '';
  }

}
