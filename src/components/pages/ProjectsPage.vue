<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="8" offset-lg="2">
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="projects"
              :items-per-page="15"
              class="elevation-1"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.name }}</td>
                  <td>{{ item.details }}</td>
                  <td>{{ formatDate(item.initDate) }}</td>
                  <td>{{ formatDate(item.endDate) }}</td>
                  <td>
                    <a
                      v-for="user in item.users"
                      target="_blank"
                      :href="user.webUrl"
                      :key="user.username"
                    >
                      <user-avatar :url="user.avatarUrl" />
                    </a>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
          <v-col>
            <v-btn
              outlined
              color="accent"
              elevation="2"
              type="button"
              @click="navigateToMainPage()"
            >
              Go back
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "ProjectsPage",
  components: {
    UserAvatar,
  },
  data() {
    return {
      headers: [
        { text: "Project", value: "name" },
        { text: "Details", value: "details" },
        { text: "Initial date", value: "initDate" },
        { text: "End date", value: "endDate" },
        { text: "Users", value: "users" },
      ],
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    /**
     * Navigate to the main page using vue-router.
     *
     * @return {void}
     */
    navigateToMainPage() {
      this.$router.push({
        name: "MainPage",
      });
    },

    /**
     * Format date string.
     *
     * @return {string}
     */
    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
};
</script>
