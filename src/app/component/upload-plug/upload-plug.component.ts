import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Parameters} from '../../entity/Parameters';
import {Plugin} from '../../entity/plugin';
import {GetPluginService} from '../../service/getplugin/get-plugin.service';

@Component({
  selector: 'app-upload-plug',
  templateUrl: './upload-plug.component.html',
  styleUrls: ['./upload-plug.component.css']
})
export class UploadPlugComponent implements OnInit {

  headerUp: HttpHeaders;

  plugin: Plugin = new Plugin();

  params: Array<Parameters> = new Array<Parameters>();

  values: Array<string> = new Array<string>();

  body: string;

  back: string;

  constructor(private client: HttpClient, private get: GetPluginService, private router: Router) {
    this.headerUp = new HttpHeaders({
      'Authorization': 'my-auth-token',
      'enctype': 'multipart/form-data'
    });
  }

  ngOnInit() {
    if (this.get.plugins != null) {
      this.plugin = this.get.plugins;
      this.back = this.plugin.pluginBack;
      this.body = this.plugin.pluginBody;
      this.params = JSON.parse(this.plugin.pluginParameterStr) as Array<Parameters>;
    }
  }

  upload(files): any {
    const formData = new FormData();
    formData.append('opm', files.files[0]);
    console.log(files.files[0]);
  }

  changeParameterName(newValue, index): any {
    this.values[index] = newValue;
  }

  submit(): void {

    let regex3 = /\#{(.+?)\}/i;
    let sql: string = this.plugin.pluginBody;

    this.plugin.pluginBack = this.back;
    this.plugin.pluginBody = this.body;

    for (let i = 0; i < this.params.length; i++) {
      sql = sql.replace(regex3, this.values[i]);
    }

    this.plugin.pluginBody = sql;

    if (this.plugin.pluginBack != null) {
      let back: string = this.plugin.pluginBack;
      let regex4 = /\#{(.+?)\}/g;
      let p = this.plugin.pluginBack.match(regex4);
      if (p != null) {
        for (let j = 0; j < p.length; j++) {
          for (let i = 0; i < this.params.length; i++) {
            if (p[j] === '#{' + this.params[i].name + '}') {
              back = back.replace(regex3, this.values[i]);
            }
          }
        }
        this.plugin.pluginBack = back;
      }
    }

    this.plugin.pluginParameterStr = JSON.stringify(this.params);
    console.log(this.plugin);
    this.client.post<any>('/plugin/run', this.plugin).toPromise().then((value) => {
      if (value.code === -1) {
        alert(value.msg);
      } else {
        alert(value.msg);
      }
    }).catch(reason => {
      console.log(reason);
    });

  }
}




