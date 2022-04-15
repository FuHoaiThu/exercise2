<template>
  <div class="province">
    <div class="province-wrap">
      <div class="select">
        <div class="select-header" @click="openOption = !openOption">
          <p class="select-header__title">Chọn tỉnh thành</p>
          <span class="select-header__icon"></span>
        </div>
        <!--show cac tinh thanh -->
        <div v-if="openOption">
          <div class="select-options">
            <ul>
              <li
                class="options-item"
                v-for="(province, index) in provinces"
                :key="index"
              >
                <input
                  class="options-item__check"
                  type="checkbox"
                  :id="'province' + index"
                  @change="selectedProvince($event, province)"
                  :checked="selects.some(item => item == province.name)"
                />
                <label class="options-item__cont" :for="'province' + index">{{
                  province.name
                }}</label>
              </li>
            </ul>
          </div>
          <div class="options-action">
            <button
              class="btn btn--blue options-action__btn"
              :disabled="selects.length <= 0"
              :class="{ 'disabled-btn': selects.length <= 0 }"
              @click="showChooseOption"
            >
              Đồng ý
            </button>
            <button class="btn btn--white" @click="openOption = false">
              Hủy
            </button>
          </div>
        </div>
        <!--show lua chon sau khi click button dong y-->
        <div>
          <ChooseOptions
            :selects="selects"
            v-if="submit && selects.length > 0 && !openOption"
          ></ChooseOptions>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChooseOptions from "./chooseOptions.vue";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      openOption: false,
      submit: false
    };
  },
  components: {
    ChooseOptions
  },
  computed: {
    ...mapState({
      provinces: state => state.provinces,
      selects: state => state.selects
    })
  },
  mounted() {
    this.$store.dispatch("getProvince");
  },
  methods: {
    ...mapActions({
      addSelectField: "addSelectField",
      removeSelectField: "removeSelectField"
    }),
    selectedProvince(e, province) {
      if (e.target.checked) {
        // this.$store.dispatch("addSelectField", province);
        this.addSelectField(province);
      } else {
        // this.$store.dispatch("removeSelectField", province.name);
        this.removeSelectField(province.name);
      }
    },
    showChooseOption() {
      this.submit = true;
      this.openOption = false;
    }
  }
};
</script>

<style scoped>
.province {
  width: 100%;
  overflow: hidden;
}
.province-wrap {
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding-top: 104px;
}
.select-header {
  background-color: #fff;
  border: 1px solid #007bc3;
  box-sizing: border-box;
  box-shadow: 0px 0px 8px rgba(0, 123, 195, 0.32);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
}
.select-header__title {
  padding: 16px 0 16px 10px;
  color: #999;
}
.select-header__icon {
  display: block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 8px solid #555;
  position: absolute;
  top: 50%;
  right: 22px;
  transform: translate(0, -50%);
  -moz-transform: translate(0, -50%);
  -webkit-transform: translate(0, -50%);
  -o-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
}
.select-options {
  width: 100%;
  max-height: 304px;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0px 1px 8px rgba(102, 102, 102, 0.2);
  border-radius: 4px;
  padding: 8px 0;
  transition: all 0.3s ease;
}
.select-options::-webkit-scrollbar {
  width: 8px;
  height: 62px;
  display: block;
  border-radius: 6px;
}
.select-options::-webkit-scrollbar-thumb {
  background-color: #dcdcdc;
}
.options-item {
  padding-left: 20px;
  padding-bottom: 8px;
  padding-top: 8px;
  cursor: pointer;
}
.options-item:hover {
  background-color: #ced6e0;
}
.options-item__check {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  border: 1px solid #000;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 2px;
  position: relative;
}
.options-item__check:checked {
  outline: none;
  border: none;
  background-color: #45d1c9;
  color: #fff;
  width: 18px;
  height: 18px;
}
.options-item__check::before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: scale(0);
  -moz-transform: scale(0);
  -webkit-transform: scale(0);
  -o-transform: scale(0);
  -ms-transform: scale(0);
  width: 8px;
  height: 6px;
  transition: 120ms transform ease-in-out;
  background-color: #fff;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}
.options-item__check:checked::before {
  transform: translate(-50%, -50%) scale(1);
  -moz-transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  -o-transform: translate(-50%, -50%) scale(1);
  -ms-transform: translate(-50%, -50%) scale(1);
}
.options-item__cont {
  display: inline-block;
  vertical-align: middle;
  padding-left: 12px;
  cursor: pointer;
}
/* select action */
.options-action {
  padding-top: 4px;
}
.options-action__btn {
  border-radius: 4px;
  font-weight: 700;
  padding: 0.25rem 1.1875rem;
  margin-right: 11px;
}
.options-action__btn:focus,
.options-action__btn:active {
  outline: none;
  box-shadow: none;
  border: none;
}
.btn--blue {
  background: #007bc3;
  color: #fff;
}
.btn--white {
  background-color: #fff;
  color: #007bc3;
}
.disabled-btn {
  background-color: #dcdcdc;
  cursor: pointer;
}
</style>
