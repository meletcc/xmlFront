import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from '../../service/loginService/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm = {
    name: '',
    pwd: ''
  };

  error_msg = '';

  constructor(private loginSvr: LoginService, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
  }

  // 提交登录表单
  signinSub() {
    // this.loginSvr.login(this.signinForm.name, this.signinForm.pwd)
    //   .subscribe((data: any) => {
    //     // if (data.code === 0) {
    //     //   // 状态码为 0 表示登录成功，把 token 共享出去
    //     //   window.sessionStorage.setItem('auto_token', data.data.token);
    //     //   // 对象存储要转成字符串
    //     //   window.sessionStorage.setItem('user', JSON.stringify(data.data.name));
    //     //   alert('登录成功!');
    //     // } else {
    //     //   alert(data.msg);
    //     // }
    //     // this.router.navigate(['/']);
    //   }, err => {
    //     console.log(err);
    //   });
  }

}
