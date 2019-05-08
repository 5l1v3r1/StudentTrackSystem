import store from '@/store'
import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Route, RouteConfig} from "vue-router";


@Module({dynamic: true, store, name: 'tagsview'})
class TagsView extends VuexModule {
    public visitedViews: RouteConfig[] = [];
    public cachedViews: string[] = [];


    @Mutation
    public ADD_VISITED_VIEW(view: Route) {
        if (this.visitedViews.some(v => v.path === view.path))
            return;
        this.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            }));
    }

    @Mutation
    public ADD_CACHED_VIEW(view: Route) {
        if (view.name === undefined)
            view.name = '';

        if (this.cachedViews.includes(view.name))
            return;
        if (!view.meta.noCache) {
            this.cachedViews.push(view.name)
        }
    }

    @Mutation
    public DEL_VISITED_VIEW (view: Route) {
        for (const [i, v] of this.visitedViews.entries()) {
            if (v.path === view.path) {
                this.visitedViews.splice(i, 1)
                break;
            }
        }
    }

    @Mutation
    public DEL_CACHED_VIEW (view: Route) {
        for (const i of this.cachedViews) {
            if (i === view.name) {
                const index = this.cachedViews.indexOf(i);
                this.cachedViews.splice(index, 1);
                break
            }
        };
    }

    @Mutation
    public DEL_OTHERS_VISITED_VIEWS (view: Route) {
        this.visitedViews = this.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
        });
    }

    @Mutation
    public DEL_OTHERS_CACHED_VIEWS (view: Route) {
        for (const i of this.cachedViews) {
            if (i === view.name) {
                const index = this.cachedViews.indexOf(i);
                this.cachedViews = this.cachedViews.slice(index, index + 1);
                break
            }
        }
    }

    @Mutation
    public DEL_ALL_VISITED_VIEWS() {
        // keep affix tags
        const affixTags = this.visitedViews.filter(tag => tag.meta.affix);
        this.visitedViews = affixTags
    }

    @Mutation
    public DEL_ALL_CACHED_VIEWS() {
        this.cachedViews = []
    }

    @Mutation
    public UPDATE_VISITED_VIEW (view: RouteConfig) {
        for (let v of this.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break
            }
        }
    }

    @Action
    public addView(view: Route){
        this.context.dispatch('addVisitedView', view);
        this.context.dispatch('addCachedView', view);
    }

    @Action
    public addVisitedView(view: Route) {
        this.context.commit('ADD_VISITED_VIEW', view);
    }

    @Action
    public addCachedView(view: Route) {
        this.context.commit('ADD_CACHED_VIEW', view)
    }

    @Action
    public async delView(view: Route) {
        return new Promise(resolve => {
            this.context.dispatch('delVisitedView', view);
            this.context.dispatch('delCachedView', view);
            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews]
            })
        })
    }

    @Action
    public delVisitedView(view: Route) {
        return new Promise(resolve => {
            this.context.commit('DEL_VISITED_VIEW', view)
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delCachedView(view: Route) {
        return new Promise(resolve => {
            this.context.commit('DEL_CACHED_VIEW', view)
            resolve([...this.cachedViews])
        })
    }

    @Action
    public delOthersViews(view) {
        return new Promise(resolve => {
            this.context.dispatch('delOthersVisitedViews', view)
            this.context.dispatch('delOthersCachedViews', view)
            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews]
            })
        })
    }

    @Action
    public delOthersVisitedViews(view: Route) {
        return new Promise(resolve => {
            this.context.commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delOthersCachedViews(view: Route) {
        return new Promise(resolve => {
            this.context.commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...this.cachedViews])
        })
    }

    @Action
    public delAllViews(view: Route) {
        return new Promise(resolve => {
            this.context.dispatch('delAllVisitedViews', view)
            this.context.dispatch('delAllCachedViews', view)
            resolve({
                visitedViews: [...this.visitedViews],
                cachedViews: [...this.cachedViews]
            })
        })
    }

    @Action
    public delAllVisitedViews() {
        return new Promise(resolve => {
            this.context.commit('DEL_ALL_VISITED_VIEWS')
            resolve([...this.visitedViews])
        })
    }

    @Action
    public delAllCachedViews() {
        return new Promise(resolve => {
            this.context.commit('DEL_ALL_CACHED_VIEWS')
            resolve([...this.cachedViews])
        })
    }

    @Action
    updateVisitedView(view: Route) {
        this.context.commit('UPDATE_VISITED_VIEW', view)
    }

}

export const TagsViewModule = getModule(TagsView);
