import store from '@/store'

import { Module, VuexModule, Mutation, Action, getModule, MutationAction } from 'vuex-module-decorators'

import { LoginAsync } from '@/api/login';

import { GetMyAccountInfoAsync } from '@/api/user'

import {User} from '@/models/user';

import {setToken, getToken, removeToken} from '@/utils/auth';



// the function definition with the “async” keyword directs Javascript to automatically wrap that value in a resolved promise.

// Let’s emphasize: await literally makes JavaScript wait until the promise settles, and then go on with the result.
// That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.


@Module({ dynamic: true, store, name: 'auth' })
class Auth extends VuexModule {
    public token = getToken();
    public User: User = {} as User;

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
    }


    @Action({ commit: "SET_TOKEN" })
    public async Login(userInfo: { username: string, password: string }) {
        try {
            const { data } = await LoginAsync(userInfo.username, userInfo.password);
            setToken('Token ' + data.token); // cookie'e yazmazsak, sayfa reflesh olunca vuexdeki data gidiyor, token de kaybolacak.
            // he next time you open the page or refresh the page, you can remember The user's login status, no need to go to the login page to log in again.
            return 'Token ' + data.token;
        } catch (err) {
            console.log(err)
            //throw Error("Kullanıcı adınız ve şifrenizi doğru girdiğinizden emin olun.")
        }
    }

    @MutationAction({ mutate: ['User'] })
    public async GetMyAccountInfoAsync() {
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

    @MutationAction({ mutate: [ 'token' ] })
    public async LogOut() {
        removeToken();
        return {
            token: ''
        };
    }

}

export const AuthModule = getModule(Auth);