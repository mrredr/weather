<template>
  <div class="form">
    <input
      @keyup.enter="fetchCities(inputValue)"
      v-model="inputValue"
      class="input"
      type="text" />
    <input
      @click="fetchCities(inputValue)"
      class="button"
      type="button"
      value="add"/>
    <div
      v-if="searchCities && searchCities.length > 0"
      class="search-panel">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City } from '../types';
import { Action, State } from 'vuex-class';

@Component
export default class SearchCityComponent extends Vue {
  @State('searchCities') private searchCities: any;
  @Action('fetchCityByName') private fetchCities: any;
  private isSearchPanelVisible: boolean = true;
  private inputValue: string = '';
}
</script>

<style scoped lang="scss">
.form {
  margin-bottom: 20px;
}

.input {
  border: 1px solid lightgray;
  box-sizing: border-box;
  height: 30px;
  width: 150px;
}

.button {
  height: 30px;
  width: 63px;
  border: 1px solid lightgray;
  vertical-align: top;
}
</style>