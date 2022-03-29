<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    width="300px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        solo
        readonly
        v-model="date"
        v-bind="attrs"
        v-on="on"
        :label="label"
        @keyup.space="modal = true"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date">
      <v-spacer></v-spacer>
      <v-btn
        text
        color="error"
        @click="modal = false"
      > Close </v-btn>
      <v-btn
        depressed
        color="primary"
        @click="$refs.dialog.save(date)"
      > Select </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    label: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  watch: {
    date(value) {
      if (!this.$root.$refs.MainPage) return;
      this.$root.$refs.MainPage.form[this.model] = value;
    },
    value(passedValue) {
      this.date = passedValue;
    },
  },
  data() {
    return {
      date: '',
      modal: false,
    };
  },
};
</script>
