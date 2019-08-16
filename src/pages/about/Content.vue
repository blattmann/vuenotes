<template>
  <v-container
    fluid
    ma-0
    pa-0
  >
    <v-layout
      row
      wrap
      class="sb-main__container"
    >
      <v-flex class="sb-column">
        <div class="sb-about">
          <img
            alt="Vue logo"
            src="../../assets/logo.png"
          >
          <div class="hello">
            <h1>Hi, I'm Stefan!</h1>
            <p>
              <!-- eslint-disable-next-line -->
              I am a Frontend Engineer specialized in Vue.js, but I am also a Vanilla Ninja loving ES6. I am a big fan of ESlint and Prettier and I love clean code!
            </p>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'About',
};
</script>
