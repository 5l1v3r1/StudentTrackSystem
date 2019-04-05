import * as tslib_1 from "tslib";
import store from '@/store';
import { Module, VuexModule, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators';
import { LoginAsync } from '@/api/login';
import { GetMyAccountInfoAsync } from '@/api/user';
import { setToken, getToken, removeToken } from '@/utils/auth';
// the function definition with the “async” keyword directs Javascript to automatically wrap that value in a resolved promise.
// Let’s emphasize: await literally makes JavaScript wait until the promise settles, and then go on with the result.
// That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.
let Auth = class Auth extends VuexModule {
    // the function definition with the “async” keyword directs Javascript to automatically wrap that value in a resolved promise.
    // Let’s emphasize: await literally makes JavaScript wait until the promise settles, and then go on with the result.
    // That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.
    constructor() {
        super(...arguments);
        this.token = getToken();
        this.User = {};
    }
    SET_TOKEN(token) {
        this.token = token;
    }
    async Login(userInfo) {
        try {
            const { data } = await LoginAsync(userInfo.username, userInfo.password);
            setToken('Token ' + data.token); // cookie'e yazmazsak, sayfa reflesh olunca vuexdeki data gidiyor, token de kaybolacak.
            // he next time you open the page or refresh the page, you can remember The user's login status, no need to go to the login page to log in again.
            return 'Token ' + data.token;
        }
        catch (err) {
            console.log(err);
            //throw Error("Kullanıcı adınız ve şifrenizi doğru girdiğinizden emin olun.")
        }
    }
    async GetMyAccountInfoAsync() {
        try {
            const { data } = await GetMyAccountInfoAsync();
            return {
                User: data
            };
        }
        catch (err) {
            console.log(err);
            throw Error("");
        }
    }
    async LogOut() {
        removeToken();
        return {
            token: ''
        };
    }
};
tslib_1.__decorate([
    Mutation
], Auth.prototype, "SET_TOKEN", null);
tslib_1.__decorate([
    Action({ commit: "SET_TOKEN" })
], Auth.prototype, "Login", null);
tslib_1.__decorate([
    MutationAction({ mutate: ['User'] })
], Auth.prototype, "GetMyAccountInfoAsync", null);
tslib_1.__decorate([
    MutationAction({ mutate: ['token'] })
], Auth.prototype, "LogOut", null);
Auth = tslib_1.__decorate([
    Module({ dynamic: true, store, name: 'auth' })
], Auth);
export const AuthModule = getModule(Auth);
