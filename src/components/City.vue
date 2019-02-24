<template>
  <div>
    {{city.temp}} C, {{city.weather}} in {{city.name}}, {{city.country}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City } from '../types';

@Component
export default class CityComponent extends Vue {
  @Prop() private city!: City;
}
</script>

<style scoped lang="scss">

</style>