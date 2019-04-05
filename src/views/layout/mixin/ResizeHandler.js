import * as tslib_1 from "tslib";
import { Component, Vue, Watch } from 'vue-property-decorator';
import { DeviceType, AppModule } from '@/store/app.module';
const WIDTH = 992; // refer to Bootstrap's responsive design
let ResizeHandlerMixin = class ResizeHandlerMixin extends Vue {
    get device() {
        return AppModule.device;
    }
    get sidebar() {
        return AppModule.sidebar;
    }
    OnRouteChange() {
        if (this.device === DeviceType.Mobile && this.sidebar.opened) {
            AppModule.CloseSideBar(false);
        }
    }
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler);
    }
    mounted() {
        const isMobile = this.isMobile();
        if (isMobile) {
            AppModule.ToggleDevice(DeviceType.Mobile);
            AppModule.CloseSideBar(true);
        }
    }
    isMobile() {
        const rect = document.body.getBoundingClientRect();
        return rect.width - 1 < WIDTH;
    }
    resizeHandler() {
        if (!document.hidden) {
            const isMobile = this.isMobile();
            AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
            if (isMobile) {
                AppModule.CloseSideBar(true);
            }
        }
    }
};
tslib_1.__decorate([
    Watch('$route')
], ResizeHandlerMixin.prototype, "OnRouteChange", null);
ResizeHandlerMixin = tslib_1.__decorate([
    Component
], ResizeHandlerMixin);
export default ResizeHandlerMixin;
