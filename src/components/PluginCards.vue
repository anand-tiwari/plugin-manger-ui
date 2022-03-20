<template>
    <div class="plugin_card__container">
        <template v-for="plugin in filteredPluginTab">
            <PluginCard :plugin="plugin" @updatePluginStatus="updatePluginStatus" />
        </template>
    </div>
</template>
<script src="./js/plugin-cards.js"></script>
<style lang="scss" scoped>
  .plugin_card__container{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));//repeat(3, 30%);
    grid-gap: 2%;
    align-content: start;
  }
</style>