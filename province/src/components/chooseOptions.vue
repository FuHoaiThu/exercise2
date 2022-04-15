<template>
  <div class="select-header select-header--child">
    <ul class="province-select">
      <li
        class="province-select__item"
        v-for="(province, index) in selects"
        :key="index"
      >
        <p class="province-name">{{ province }}</p>
        <div class="delete-icon" @click="removeProvince(province)">
          <img src="../assets/Rectangle.svg" class="w-100" />
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["selects"],
  methods: {
    ...mapActions({
      removeSelectField: "removeSelectField"
    }),
    removeProvince(province) {
      //   this.$store.dispatch("removeSelectField", province);
      this.removeSelectField(province);
    }
  }
};
</script>

<style scoped>
.select-header--child {
  margin-top: 8px;
}
.province-select {
  padding: 8px;
}
.province-select .province-select__item {
  display: inline-block;
}
.province-select__item {
  padding-right: 4px;
}
.province-select__item:hover {
  background-color: #ced6e0;
}
.province-name {
  display: inline-block;
  vertical-align: middle;
  padding: 4px 10.5px 4px 16px;
  line-height: 24px;
}
.delete-icon {
  display: inline-block;
}
.delete-icon {
  width: 11px;
  height: 11px;
}
</style>
