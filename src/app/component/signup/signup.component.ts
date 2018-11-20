import {Component, OnInit} from '@angular/core';
// 导入http访问后台
import {HttpClient} from '@angular/common/http';
// 导入路由跳转
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // 双向绑定便于表单判断 在表单当中给了双向绑定，规定需要给name 属性
  signupForm = {
    email: '',
    password: ''
  };

  email_msg = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  // 表单验证模板的会失效 用了ng的submit ng有专门的表单验证
  signupSub() {
    const formData = this.signupForm;
    this.http.post('http://localhost:3000/users', formData)
      .toPromise()
      .then((data: any) => {
        this.email_msg = '';
        this.router.navigate(['/signin']);
      }).catch(err => {
      if (err.status === 409) {
        this.email_msg = '邮箱被占用';
      }
    });
  }

}
