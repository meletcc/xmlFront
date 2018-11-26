import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// 登录
import {SigninComponent} from './component/signin/signin.component';
// 注册
import {SignupComponent} from './component/signup/signup.component';
// 布局模块
import {LayoutComponent} from './component/layout/layout.component';
// 制作插件
import {ContactListComponent} from './component/contact-list/contact-list.component';
// 路由拦截
import {AuthGuard} from './auth.guard';
// 日志
import {LogComponent} from './component/log/log.component';
// 全量备份
import {FullBackComponent} from './component/full-back/full-back.component';
// 上传插件
import {UploadPlugComponent} from './component/upload-plug/upload-plug.component';
// 插件管理
import {PluginManagerComponent} from './component/plugin-manager/plugin-manager.component';

// 1.路由模块初始化
// 2.配置路由表，导航到某个组件
// 3.配置路由出口及路由导航链接 <router-outlet></router-outlet> 出口

// 配置路由表
const routers: Routes = [
  // 默认地址
  {
    path: '',
    redirectTo: '/contactList', // 根路径跳转到制作插件页面，然后请求拦截
    pathMatch: 'full' // 必须完全匹配路径的时候才做重定向
  },
  {
    // 输入链接 contactList 时 会先渲染 layout 布局组件，然后再渲染子组建到 layout 组件下的路由出口
    path: 'contactList',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactListComponent
      }
    ]
  },
  {
    path: 'pluginManager',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PluginManagerComponent
      }
    ]
  },
  {
    path: 'plugin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UploadPlugComponent
      }
    ]
  },
  {
    path: 'log',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: LogComponent
      }
    ]
  },
  {
    path: 'fullback',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: FullBackComponent
      }
    ]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [
    // 路由模块导入上面配置的路由表
    RouterModule.forRoot(routers)
  ],
  // 暴露该路由模块
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
