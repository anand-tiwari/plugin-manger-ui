<template>
        <div class="card" :class="{ 'disabled' : plugin.disabled === 'disabled'}">
           <div>{{plugin.title}}</div>
           <div>
                <SwitchButton :modelValue="switch" @update:modelValue="updateSwitch" />
                <span>{{plugin.status}}</span>
            </div>
           <div class="card__description">{{plugin.description}}</div>
        </div>
</template>
<script src="./js/plugin-card.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/_color.scss";
.card{
    border: 0.1rem solid $gray-light;
    display: grid;
    grid-template-columns: 75% 25%;
    grid-template-rows: min-content auto;
    padding: 0.5rem;
    border-radius: 0.4rem;
    grid-gap: 0.1rem 0;
    &__description {
        padding: 1rem 0;
    }
}
.disabled{
    cursor: not-allowed;
    opacity: 0.5;
}
</style>