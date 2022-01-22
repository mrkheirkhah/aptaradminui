<template>
  <div style="width: 100%">
    <p style="margin-bottom: 8px">{{ label + (required ? " *" : "") }}</p>
    <model-list-select
      :isDisabled="disabled"
      :list="options"
      :isError="hasError"
      v-model="value"
      option-value="value"
      option-text="label"
      :placeholder="placeholder"
      style="width: 100%; text-align: right; padding-right: 35px"
    >
    </model-list-select>
  </div>
</template>

<script>
import { ModelListSelect } from "vue-search-select";

export default {
  components: {
    ModelListSelect,
  },
  props: {
    label: {
      type: String,
      default: "",
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    isValid: {
      type: Function,
      required: false,
      default: () => true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    outerValue: {
      required: false,
      default: null
    }
  },
  data() {
    return {
      value: {},
      stringItem: "",
      hasError: false,
    };
  },
  watch: {
    value({ value }) {
      this.hasError = !this.isValid();
      if (this.isValid()) {
        this.$emit("update", value);
      }
    },
  },
  mounted() {
    if (this.required) {
      this.hasError = true;
    }
    if(this.outerValue) {
      this.value = this.outerValue
    }
  },
};
</script>

<style lang="scss">
#app
  > div.c-app
  > div.c-wrapper
  > div.c-body
  > main
  > div
  > div
  > div
  > form
  > div:nth-child(1)
  > div:nth-child(10)
  > div
  > div
  > div.menu.visible
  > div {
  text-align: right;
}
</style>
