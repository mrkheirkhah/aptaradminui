<template>
  <div>
    <CSelect
      placeholder="بازه"
      :options="[
        { label: 'بین', value: 'Between' },
        { label: 'بزرگتر', value: 'GreaterThan' },
        { label: 'بزرگتر و مساوی', value: 'GreaterThanOrEqual' },
        { label: 'کوچکتر', value: 'LessThan' },
        { label: 'کوچکتر و مساوی', value: 'LessThanOrEqual' },
        { label: 'مساوی', value: 'Equal' },
        { label: 'نامساوی', value: 'NotEqual' },
      ]"
      @update:value="
        (value, ev) => {
          selectedMode = value;
        }
      "
    />
    <date-picker
      :range="selectedMode !== 'Equal'"
      clearable
      locale="fa"
      format="YYYY-MM-DD HH:mm"
      display-format="jYYYY/jM/jD"
      label=""
      v-model="range"
    />
  </div>
</template>

<script>
import { captalizeFirstLetter } from "@/utils";
export default {
  props: {
    column: {
      required: true,
      type: String,
    },
  },
  data() {
    return { range: [], selectedMode: null };
  },
  computed: {
    operatorSelected() {
      return !!this.selectedMode;
    },
    dateSelected() {
      return this.range.filter(Boolean).length > 0;
    },
    filterObject() {
      const self = this;
      return [
        "date",
        {
          column: captalizeFirstLetter(self.column),
          type: self.selectedMode,
          value: self.range[0],
          value2: self.range[1] ? self.range[1] : null,
        },
      ];
    },
  },
  watch: {
    range() {
      if (this.operatorSelected && this.dateSelected) {
        this.$emit("filter-changed", this.filterObject);
      }
    },
    selectedMode() {
      if (this.operatorSelected && this.dateSelected) {
        this.$emit("filter-changed", this.filterObject);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
