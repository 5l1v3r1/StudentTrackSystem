import * as tslib_1 from "tslib";
import store from '@/store';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { AuthModule } from './auth.module';
import { constantRouterMap, asyncRouterMap } from '@/router';
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role));
    }
    else {
        return true;
    }
}
function filterAuthorityRouter(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAuthorityRouter(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    return res;
}
let Permission = class Permission extends VuexModule {
    constructor() {
        super(...arguments);
        this.userType = 0;
        this.routers = [];
        this.addRouters = [];
    }
    SET_ROUTERS(routers) {
        this.addRouters = routers;
        this.routers = constantRouterMap.concat(routers);
    }
    REMOVE_ROUTERS() {
        this.routers = [];
    }
    SET_USERTYPE(type) {
        this.userType = type;
    }
    async GenerateRoutes() {
        const roles = [AuthModule.User.user_type];
        return filterAuthorityRouter(asyncRouterMap, roles);
    }
    SetUserType(type) {
        return type;
    }
};
tslib_1.__decorate([
    Mutation
], Permission.prototype, "SET_ROUTERS", null);
tslib_1.__decorate([
    Mutation
], Permission.prototype, "REMOVE_ROUTERS", null);
tslib_1.__decorate([
    Mutation
], Permission.prototype, "SET_USERTYPE", null);
tslib_1.__decorate([
    Action({ commit: "SET_ROUTERS" })
], Permission.prototype, "GenerateRoutes", null);
tslib_1.__decorate([
    Action({ commit: 'SET_USERTYPE' })
], Permission.prototype, "SetUserType", null);
Permission = tslib_1.__decorate([
    Module({ dynamic: true, store, name: 'permission' })
], Permission);
export const PermissionModule = getModule(Permission);
