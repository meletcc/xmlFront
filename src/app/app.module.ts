import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {SigninComponent} from './component/signin/signin.component';
import {SignupComponent} from './component/signup/signup.component';
import {ContactListComponent} from './component/contact-list/contact-list.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutComponent} from './component/layout/layout.component';
// 导入表单功能，比如双向绑定
import {FormsModule} from '@angular/forms';
// 引入http模型
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// 引入 拦截器
import {GlobalInterceptor} from './global.interceptor';
/** 配置 angular i18n **/
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {LoginService} from './service/loginService/login.service';
import {LogComponent} from './component/log/log.component';
import {PagingComponent} from './component/paging/paging.component';
import {FullBackComponent} from './component/full-back/full-back.component';
import {GetLogService} from './service/logService/get-log.service';
import {FullbackServiceService} from './service/fullbackService/fullback-service.service';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

registerLocaleData(zh);

// 可以写多个拦截器
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true},
];

@NgModule({
  // 声明组件
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    ContactListComponent,
    LayoutComponent,
    LogComponent,
    PagingComponent,
    FullBackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    LoginService,
    GetLogService,
    FullbackServiceService,
    /** 配置 ng-zorro-antd 国际化 **/
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
