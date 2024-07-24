<template>
  <v-app id="inspire">
    <v-app-bar color="grey-lighten-4" flat height="72">
      <v-app-bar-title class="text-h5 font-weight-bold">
        DASHBOARD
      </v-app-bar-title>
    </v-app-bar>

    <v-footer app color="grey" height="44" />

    <v-navigation-drawer permanent>

      <v-tabs v-model="tab" class="pa-1" direction="vertical" selected-class="tab-selected">
        <v-tab selected-class="tab-selected" text="Overview" value="overview" />
        <v-tab text="Usuarios" value="usuarios" />
        <v-tab text="Equipos" value="equipos" />
        <v-tab text="Integraciones" value="integraciones" />
      </v-tabs>

    </v-navigation-drawer>

    <v-main>

      <v-sheet class="px-13 pt-3 text-h5 font-weight-bold" color="#5E6AD2" height="49px">{{ tab.toUpperCase() }}
      </v-sheet>
      <v-tabs-window v-model="tab">
        <v-row>
          <v-col>

            <v-card
              class="mx-auto"
              color="surface-variant"
              max-width="344"
              subtitle="Greyhound divisely hello coldly fonwderfully"
              title="Headline"
            >
              <template #actions>
                <v-btn text="Button" />
              </template>
            </v-card>
          </v-col>
          <v-col />
        </v-row>
      </v-tabs-window>

    </v-main></v-app>
</template>

<script lang="ts" setup>
  const tab = ref('overview')
</script>

<style lang="scss">
// src/styles/main.scss or your main style file
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.v-application,
html {
  [class*='text-'] {
    font-family: 'Montserrat', normal !important;
    color: rgb(var(--v-theme-wiris-font-color));
  }

  font-family: 'Montserrat',
  sans-serif !important;
}

.tab-selected {
  background-color: white;
  color: black;
}
</style>
