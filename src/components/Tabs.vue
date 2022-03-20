<template>
    <div class="tabs">
        <div class="tab" v-for="tab in tabs"
        @click="tabClick(tab)" 
        :class="{ 'active' : tab == selectedTab}">
            <div class="veritcal"></div>
            <div class="tab__info">
                <img :src="getIcon(tab)"/>
                <a _target="blank" class="tab__info__text">{{ getTabLevel(tab) }}</a>
            </div>
        </div>
    </div>
</template>
<script src="./js/tabs.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/_color.scss";
.tab{
    cursor: pointer;
    text-align: center;
    display: flex;
    &__info {
       padding: 1rem 0;
       display: flex;
       align-items: center;
       justify-content: center;
       &__text{
           padding-left: 0.5rem;
       }
       img {
           height: 2rem;
           width: auto;
       }
    }
}
.active {
    background-color: $white;
    border: none;
}

.veritcal {
    visibility: hidden;
    width: 0.2rem;
    margin-right: 1rem;
}

.active .veritcal {
    visibility: visible;
    background-color: $red;
}

a {
    text-decoration: none;
    color: $black;
}
</style>