<template>
  <v-app>
    <div class="logos align-center">
      <img
        src="https://cdn.worldvectorlogo.com/logos/vue-9.svg"
        alt="Vue logo"
      />
      <img
        src="https://cdn.worldvectorlogo.com/logos/vuetify.svg"
        alt="Vuetify logo"
      />
      <img
        src="https://cdn.worldvectorlogo.com/logos/graphql.svg"
        alt="GraphQL logo"
      />
      <img
        src="https://cdn.worldvectorlogo.com/logos/gitlab.svg"
        alt="GitLab logo"
      />
      <img
        src="https://iconape.com/wp-content/files/dx/352988/svg/jest-seeklogo.com.svg"
        alt="Jest logo"
      />
      <br />
    </div>
    <div class="description align-center">
      <div>
        <b>Simple Vue app with Vuetify.</b>
        <ul>
          <li>
            It saves form data on vuex store and display it on a table in the
            next page;
          </li>
          <li>It uses GraphQL to fetch users data from the GitLab API;</li>
          <li>It uses Jest to test the components and some logic.</li>
        </ul>
      </div>
    </div>
    <v-divider />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="scss">
.align-center {
  text-align: center;
}
.description {
  div {
    display: inline-block;
    text-align: left;
    max-width: 600px;
  }
}
.logos {
  margin: 2rem;

  span {
    text-align: left;
  }

  img {
    height: 85px;
    margin: 0.5rem;
  }
}
</style>
