<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2">
        <b>Create a new project</b>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2">
        <v-form lazy-validation ref="form">
          <v-text-field
            outlined
            required
            autofocus
            name="name"
            v-model="form.name"
            :rules="[(v) => !!v || 'Project name is required']"
            label="Name *"
          />

          <v-text-field outlined v-model="form.details" label="Details" />

          <v-row>
            <v-col cols="12" sm="12" md="6">
              <date-picker
                label="Start Date"
                @change="form.initDate = $event"
              />
            </v-col>

            <v-col cols="12" sm="12" md="6">
              <date-picker label="End Date" @change="form.endDate = $event" />
            </v-col>
          </v-row>

          <user-field label="Search users" @change="form.users = $event" />

          <v-col class="flex">
            <v-btn
              outlined
              type="button"
              color="error"
              @click="clearFormInputs"
            >
              Clear form
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="accent"
              type="button"
              @click="navigateToProjectsPage"
            >
              Projects page
            </v-btn>
            <v-btn
              outlined
              id="submit"
              color="accent"
              elevation="2"
              type="submit"
              @click.prevent="saveProject"
            >
              Save
            </v-btn>
          </v-col>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePicker from "@/components/inputs/DatePicker";
import UserField from "@/components/inputs/UserField";

export default {
  name: "MainPage",
  components: {
    DatePicker,
    UserField,
  },
  data: () => ({
    form: {
      name: "",
      details: "",
      initDate: "",
      endDate: "",
      users: [],
    },
  }),
  mounted() {
    this.$root.$refs.MainPage = this;
    this.clearFormInputs();
  },
  methods: {
    /**
     * Navigate to the projects page using vue-router.
     *
     * @return {void}
     */
    navigateToProjectsPage() {
      this.$router.push({
        name: "ProjectsPage",
      });
    },

    /**
     * Save the form inputs to vuex and navigate to next page.
     *
     * @return {void}
     */
    saveProject() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$store.commit("pushNewProject", this.form);
      this.navigateToProjectsPage();
    },

    /**
     * Clear the form inputs.
     *
     * @return {void}
     */
    clearFormInputs() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}
</style>
