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

  user = JSON.parse(window.sessionStorage.getItem('user'));

  // 解决颜色变化
  mouseOn: Boolean = false;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  // 退出按钮
  signout() {
    window.sessionStorage.removeItem('auto_token');
    if (confirm('确认退出？')) {
      this.router.navigate(['/signin']);
    }
  }

}
