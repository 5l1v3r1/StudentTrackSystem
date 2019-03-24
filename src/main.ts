import Vue from 'vue'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/tr-TR'
import SvgIcon from 'vue-svgicon';
import '@/styles/index.scss';
import '@/icons/components';
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/permission';

Vue.use(ElementUI, {locale});

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
