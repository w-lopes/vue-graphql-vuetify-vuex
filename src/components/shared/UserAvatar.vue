<template>
  <v-avatar size="25" class="mr-1">
    <v-img :src="url.match(/^http/) ? url : `https://gitlab.com/${url}`" />
  </v-avatar>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>
