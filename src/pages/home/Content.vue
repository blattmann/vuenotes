<template>
  <v-container fluid ma-0 pa-0>
    <v-layout row wrap class="sb-main__container">

      <v-flex xs4 offset-xs4 class="sb-column">
        <div class="sb-home">
          <img alt="Vue logo" src="../../assets/logo.png">
          <div class="hello">
            <h1>Welcome to vuenotes</h1>
            <p>
              This is a simple notes taking app. You may add / edit and delete some notes.
            </p>
            <p>
              &copy; 2018
              <a class="sb-home__link" href="https://stefan-blattmann.com/" target="_blank">Stefan Blattmann</a>
            </p>
          </div>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
