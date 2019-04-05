import * as tslib_1 from "tslib";
import Cookies from 'js-cookie';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
export var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Mobile"] = 0] = "Mobile";
    DeviceType[DeviceType["Desktop"] = 1] = "Desktop";
})(DeviceType || (DeviceType = {}));
// Create module later in your code (it will register itself automatically)
// In the decorator we pass the store object into which module is injected
// NOTE: When you set dynamic true, make sure you give module a name
let App = class App extends VuexModule {
    // Create module later in your code (it will register itself automatically)
    // In the decorator we pass the store object into which module is injected
    // NOTE: When you set dynamic true, make sure you give module a name
    constructor() {
        super(...arguments);
        this.sidebar = {
            opened: Cookies.get('sidebarStatus') !== 'closed',
            withoutAnimation: false,
        };
        this.device = DeviceType.Desktop;
    }
    ToggleSideBar(withoutAnimation) {
        return withoutAnimation;
    }
    CloseSideBar(withoutAnimation) {
        return withoutAnimation;
    }
    ToggleDevice(device) {
        return device;
    }
    TOGGLE_SIDEBAR(withoutAnimation) {
        if (this.sidebar.opened) {
            Cookies.set('sidebarStatus', 'closed');
        }
        else {
            Cookies.set('sidebarStatus', 'opened');
        }
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;
    }
    CLOSE_SIDEBAR(withoutAnimation) {
        Cookies.set('sidebarStatus', 'closed');
        this.sidebar.opened = false;
        this.sidebar.withoutAnimation = withoutAnimation;
    }
    TOGGLE_DEVICE(device) {
        this.device = device;
    }
};
tslib_1.__decorate([
    Action({ commit: 'TOGGLE_SIDEBAR' })
], App.prototype, "ToggleSideBar", null);
tslib_1.__decorate([
    Action({ commit: 'CLOSE_SIDEBAR' })
], App.prototype, "CloseSideBar", null);
tslib_1.__decorate([
    Action({ commit: 'TOGGLE_DEVICE' })
], App.prototype, "ToggleDevice", null);
tslib_1.__decorate([
    Mutation
], App.prototype, "TOGGLE_SIDEBAR", null);
tslib_1.__decorate([
    Mutation
], App.prototype, "CLOSE_SIDEBAR", null);
tslib_1.__decorate([
    Mutation
], App.prototype, "TOGGLE_DEVICE", null);
App = tslib_1.__decorate([
    Module({ dynamic: true, store, name: 'app' })
], App);
export const AppModule = getModule(App);
