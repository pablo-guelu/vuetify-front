<template>
  <v-app id="inspire">
    <v-app-bar color="#F4F5F8" flat height="72">
      <v-app-bar-title class="text-h5 font-weight-bold">
        DASHBOARD
      </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer class="pb-2" color="#222326" permanent>
      <div class="d-flex flex-column pa-1" style="text-transform: none;">
        <v-list nav>
          <v-list-item v-for="item in pages" :key="item.title" :value="item.title" @click="item.action" :active="tab === item.title" variant="tonal"> 
            <span :class="{'font-weight-bold': tab === item.title}">{{ item.title }}</span>
          </v-list-item>
        </v-list>
      </div>
      <template v-slot:append>
        <div class="pa-4 text-subtitle-1">
          <p class="font-weight-bold">Any Doubt?</p>
          <p>Contact us at:</p>
          <a class="font-weight-bold" href="mailto:help@company.com"
            style="color: #5E6AD2; text-decoration: none">help@company.com</a>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>

      <v-sheet class="h-100 pb-12" color="#E9E9EC">
        <v-sheet class="px-13 pt-3 text-h5 font-weight-bold" color="#5E6AD2" height="49px">{{ tab.toUpperCase() }}
        </v-sheet>
        <v-tabs-window v-model="tab" class="pt-12">
          <v-tabs-window-item value="Overview">
            <v-row class="px-13">
              <v-col align-self="center" class="h-100 w-100">
                <v-card class="w-100 px-8 py-5 rounded-lg" color="#FFFFFF" :height="350">
                  <v-card-item>
                    <v-card-title class="d-flex align-center">
                      <span class="text-h5 me-6">Prueba técnica</span>
                      <v-divider />
                      <v-menu>
                        <template #activator="{ props }">
                          <v-btn class="ms-6" color="transparent" flat icon="mdi-dots-vertical" v-bind="props" />
                        </template>
                        <v-btn v-for="option in options" :key="option.title" class="menu-btn w-100 d-flex justify-start"
                          style="background-color: white;" elevation="4" variant="outlined">
                          <v-icon :icon="option.icon" size="x-large" />
                          <span class="ms-2">{{ option.title }}</span>
                        </v-btn>
                      </v-menu>
                    </v-card-title>
                  </v-card-item>
                  <v-card-text class="mt-4">
                    Consigna:
                    Replicar este dashboard respetando estilos y colores definidos en Figma.
                    Agregar vistas para manejo de usuarios, equipos e integraciones, linkeables desde el panel de
                    navegación.
                    Realizar un backend para el CRUD de los datos de usuarios, equipos e integraciones implementando los
                    modelos
                    descriptos abajo.
                    Requerimientos:
                    Para el frontend utilizar el framework Vue.js con librería de componentes Vuetify.
                    Para el backend utilizar el framework Fastapi.
                    Entrega del código de frontend y backend en un zip.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col>
                <div class="h-100 d-flex flex-column justify-space-between">
                  <template v-for="item in pages" :key="item.title">
                    <v-card v-if="item.title !== 'Overview'" class="w-100 px-8 py-5 rounded-lg" color="#FFFFFF"
                      :height="100" @click="item.action">
                        <v-card-title>
                          {{ item.title }}
                        </v-card-title>
                    </v-card>
                  </template>
                </div>
              </v-col>
            </v-row>
            <v-row class="px-13">
              <v-col>
                <v-card class="w-100 px-8 py-5 rounded-lg" color="#FFFFFF" :max-height="500">
                  <v-card-item>
                    <v-card-title class="d-flex align-center">
                      <span class="text-h5 me-6">Modelo de Datos</span>
                      <v-divider />
                      <v-menu>
                        <template #activator="{ props }">
                          <v-btn class="ms-6" color="transparent" flat icon="mdi-dots-vertical" v-bind="props" />
                        </template>
                        <v-btn v-for="option in options" :key="option.title" class="menu-btn w-100 d-flex justify-start"
                          style="background-color: white;" elevation="4" variant="outlined">
                          <v-icon :icon="option.icon" size="x-large" />
                          <span class="ms-2">{{ option.title }}</span>
                        </v-btn>
                      </v-menu>
                    </v-card-title>
                  </v-card-item>
                  <v-card-text class="mt-4">
                    <v-img src="./assets/fastApiDB.png" width="100%" :max-height="400"> </v-img>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tabs-window-item>

          <v-tabs-window-item value="Usuarios">
            <UserDataView :model="'Usuario'"/>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-sheet>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import UserDataView from './users/UserDataView.vue';


const tab = ref('Overview')
const options = [
  {
    title: 'Config',
    icon: 'mdi-cog',

  },
  {
    title: 'Editar',
    icon: 'mdi-pencil',
  },
]
const pages = [
  {
    title: 'Overview',
    action: () => tab.value = 'Overview',
  },
  {
    title: 'Usuarios',
    action: () => tab.value = 'Usuarios',
  },
  {
    title: 'Equipos',
    action: () => tab.value = 'Equipos',
  },
  {
    title: 'Integraciones',
    action: () => tab.value = 'Integraciones',
  },
]
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

:deep(.v-tab-item--selected.v-tab--selected) {
  background-color: #5E6AD2 !important;
  color: white !important;
}

.menu-btn {
  background-color: white !important;
  color: #222326 !important;
  margin-top: 10px !important;
  border-radius: 4px !important;
  border-color: #CFD8DC !important;
  text-transform: none !important;
}

.drawer-btn {
  text-transform: none !important;
}
</style>
