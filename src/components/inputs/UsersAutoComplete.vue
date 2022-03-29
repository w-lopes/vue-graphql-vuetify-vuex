<template>
  <div>
    <span v-if="value.length">
      <b> Selected users: </b>
      <span v-text="value.map(item => item.username).join(', ')" />
    </span>
    <v-autocomplete
      multiple
      filled
      solo
      required
      return-object
      item-text="username"
      label="Select users *"
      v-model="value"
      :items="items"
      :rules="[v => !!v.length || 'At least one user is required']"
      :search-input.sync="partialUserName"
    >
      <template v-slot:append-item>
        <div v-show="items.length" v-intersect="onIntersect" class="pa-4 teal--text">
          Loading more...
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import getUsersApi from '@/shared/api/getUsersApi';

export default {
  name: 'UsersAutoComplete',
  data() {
    return {
      value: [],
      partialUserName: '',
      items: [],
      apiUsers: [],
      timeout: null
    };
  },
  watch: {
    partialUserName(partialUserNameString) {
      this.items = [];
      this.searchUsers(partialUserNameString);
    },
    value(newUserArray) {
      this.$root.$refs.MainPage.form.users = newUserArray;
    },
  },
  mounted() {
    this.$root.$refs.UsersAutoComplete = this;
    this.value = [];
  },
  methods: {

    /**
     * Increments search page when user scroll component down.
     *
     * @return {void}
     */
    onIntersect() {
      this.searchUsers(this.partialUserName);
    },

    /**
     * Search for users by partial username.
     *
     * @param {string} partialUserNameStrign
     * @return {void}
     */
    searchUsers(partialUserNameString) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout((partialUserNameString, page) => {
        getUsersApi(partialUserNameString, page).then(users => {
          this.apiUsers = users;
          this.items = this.items.concat(users);
        });
      }, 500, partialUserNameString, this.page);
    },
  },
};

</script>
