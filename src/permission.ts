import router from './router';
import NProgress from 'nprogress';
import { Route } from 'vue-router';
import {getToken, removeToken} from '@/utils/auth';
import { AuthModule } from './store/auth.module';
import { Message } from 'element-ui'
import Cookies from 'js-cookie';
import { PermissionModule } from './store/permission.module';


NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();

  if (to.path == '/swagger')
    next();
  else {
    if (getToken()) {
      if (to.path == '/login') {
        next({path: '/'});
        NProgress.done();
      }
      else {
        if (PermissionModule.routers.length === 0){ // when page is reloaded.
          AuthModule.GetMyAccountInfoAsync().then(() => {
            PermissionModule.SetUserType(AuthModule.User.user_type);

            PermissionModule.GenerateRoutes().then(() => {
              router.addRoutes(PermissionModule.addRouters);
              next({ ...to, replace: true })
            });

          }).catch(err => {
            Message.error(err);
            AuthModule.LogOut().then(() => {
              location.reload(); // yeniden yükleyince token'in olmaıdğını görüp, logine gidecek.
            });
          });
        }
        else{
          next();
        }
      }
    }
    else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next('/login');
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done() // finish progress bar
});