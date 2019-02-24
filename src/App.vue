<template>
  <div id="app">
    <div class="message">{{errorMessage}}</div>
    <SearchCity />
    <div class="subtitle">Weather in the current place:</div>
    <City v-if="localCity" :city="localCity" />

    <div
      v-if="cities && cities.length > 0"
      class="subtitle">
        List of favorites:
    </div>
    <div
      v-for="(city, index) in cities"
      class="city"
      :key="index">
      <City :city="city"></City>
      <input
        type="button"
        value="remove"
        @click="removeCity(index)"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import City from './components/City.vue';
import SearchCity from './components/SearchCity.vue';

@Component({
  components: {
    City,
    SearchCity,
  },
})
export default class App extends Vue {
  @State('localCity') private localCity: any;
  @State('cities') private cities: any;
  @State('error') private errorMessage: any;
  @Action('initData') private initData: any;
  @Action('removeCity') private removeCity: any;

  private created() {
    this.initData();
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.message {
  color: red;
  height: 30px;
}

.subtitle {
  margin-top: 20px;
}

.city {
  padding: 1px;
}

.city:hover {
  border: 1px solid lightgray;
  padding: 0;
}
</style>
