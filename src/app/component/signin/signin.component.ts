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

  constructor(private loginSvr: LoginService, private router: Router,private http :HttpClient) {
  }

  ngOnInit() {
  }

  signinSub() {

    this.loginSvr.login(this.signinForm.name, this.signinForm.pwd)
      .subscribe((data: any) => {
        this.error_msg = '';
        // window.localStorage.setItem('auto_token', data.token);
        // 对象存储要转成字符串
        // window.localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }

}
