import Cookies from 'js-cookie';

const TokenKey = 'TOKEN_KEY';

const GeneratedRouterKey = "GENERATED_ROUTER_KEY";

export const getToken = () => Cookies.get(TokenKey);

export const setToken = (token: string) => Cookies.set(TokenKey, token);

export const removeToken = () => Cookies.remove(TokenKey);


/*

export const getGeneratedRouters = () => {
    Cookies.get(GeneratedRouterKey);
};

export const setGeneratedRouters = (router: any) => {
    Cookies.set(GeneratedRouterKey, router);
};

export const removeGeneratedRouters = () => {
    Cookies.remove(GeneratedRouterKey);
};


*/
