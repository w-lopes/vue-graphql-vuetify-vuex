<template>
  <data-source-autocomplete-field
    name="data-source-autocomplete-field"
    item-text="username"
    title="Users *"
    @change="onChange($event)"
    :data-source="userDataSource"
    :value="value"
    :multiple="true"
    :required="true"
  />
</template>

<script>
import UserDataSource from "@/shared/api/UserDataSource";
import DataSourceAutocompleteField from "@/components/inputs/DataSourceAutocompleteField";

export default {
  name: "UserField",
  props: {
    value: {
      type: Array,
      default: null,
    },
  },
  components: {
    DataSourceAutocompleteField,
  },
  data: () => ({
    userDataSource: new UserDataSource(),
  }),
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>
