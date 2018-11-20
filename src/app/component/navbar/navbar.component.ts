import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  today: Date = new Date();

  user = JSON.parse(window.localStorage.getItem('user') || '{}');

  // 解决颜色变化
  mouseOn: Boolean = false;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  signout() {
    this.mouseOn = true;
    this.http.delete('http://localhost:3000/session')
      .toPromise()
      .then(data => {
        window.localStorage.removeItem('auto_token');
      }).catch(err => {
      window.alert('退出失败');
    });
    setTimeout(() => {
      this.mouseOn = false;
    }, 200);
  }


}
