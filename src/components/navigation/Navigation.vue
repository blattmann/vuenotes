<template>
  <v-navigation-drawer v-model="drawer" persistent :mini-variant="miniVariant" :clipped="clipped" enable-resize-watcher app dark width="250">

    <v-list dense id="nav">
      <v-list-tile v-for="item in items.navigation" :key="item.title" class="sb-list__tile--item">

        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <router-link :to="{ path: `${item.route}` }" class="sb-navi__link" @click.native="handleClick(item.route)">
              {{ translatePlaceholder('navigation', item.title, 'en') }}
            </router-link>
          </v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data() {
    return {
      drawer: false,
      miniVariant: false,
      clipped: true,
      items: this.$root.$data.Settings,
      i18n: this.$root.$data.Translation.navigation
    }
  }
}
</script>
