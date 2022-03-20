<template>
    <Spinner v-if="isLoading" />
    <template v-else>
    <div class="tab_page_container">
        <div class="tab_heading">Data<span>Guard</span></div>
        <div class="tab_section">
            <Tabs :selectedTab="selectedTab" @selectTab="selectTab" />
            <div class="tab_section__plugin-btn">
                <span>All Plugins Enabled</span>
                <SwitchButton :modelValue="isAllPluginEnable" @update:modelValue="toggleAllPluginEnableBtn" />
            </div>
        </div>
        <div class="plugin_heading">{{pluginHeading}}</div>
        <div class="plugin_section">
            <router-view></router-view>
        </div>
    </div>
    </template>
</template>
<script src="./js/tabs-page.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/_color.scss";
@import "~assets/scss/_responsive.scss";

.tab_page_container{
    display: grid;
    grid-template-columns: 2fr 8fr;
    grid-template-rows: min-content auto;
    height: 100vh;
}

.tab_heading{
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: $gray-light;
    text-align: center;
    font-size: 2rem;
    padding: 2rem 0;

    span {
        font-weight: 800;
    }
}
.plugin_heading {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: $white;
    padding: 2rem 3rem;
}

.tab_section{
    background-color: $gray-light;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 3;
    display: grid;
    grid-template-rows: auto min-content;
    &__plugin-btn {
        display:flex;
        padding: 3rem 0;
        justify-content: center;
        span {
            padding-right: 0.3rem;
        }
    }
}
.plugin_section {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
    padding: 0 3rem;
}
</style>