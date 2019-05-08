<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>
<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ScrollPane extends Vue {

    private tagAndTagSpacing = 4 // tagAndTagSpacing

    private left = 0;

    get scrollWrapper(){
        return (this.$refs.scrollContainer as any).$refs.wrap
    }


    public handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 40
        const $scrollWrapper = this.scrollWrapper
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    }

    public moveToTarget(currentTag) {
        const $container = (this.$refs.scrollContainer as any).$el
        const $containerWidth = $container.offsetWidth
        const $scrollWrapper = this.scrollWrapper
        const tagList: any = this.$parent.$refs.tag

        let firstTag = null
        let lastTag = null

        // find first tag and last tag
        if (tagList.length > 0) {
            firstTag = tagList[0]
            lastTag = tagList[tagList.length - 1]
        }

        if (firstTag === currentTag) {
            $scrollWrapper.scrollLeft = 0
        } else if (lastTag === currentTag) {
            $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
        } else {
            // find preTag and nextTag
            const currentIndex = tagList.findIndex(item => item === currentTag)
            const prevTag = tagList[currentIndex - 1]
            const nextTag = tagList[currentIndex + 1]

            // the tag's offsetLeft after of nextTag
            const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + this.tagAndTagSpacing

            // the tag's offsetLeft before of prevTag
            const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - this.tagAndTagSpacing

            if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
            } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
            }
        }
    }
}
</script>

<style scoped>

</style>
