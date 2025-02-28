<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Futebol com os amigos
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <!-- Gerar o menu dinamicamente com base nas rotas usando o componente EssentialLink -->
        <EssentialLink
          v-for="route in routesList"
          :key="route.path"
          :title="route.name"
          :link="route.path"
          :icon="route.icon"
          :caption="route.caption"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';

const leftDrawerOpen = ref(false);

// Obtém as rotas configuradas
const router = useRouter();

// Filtra as rotas principais que você deseja exibir no menu
const routesList = computed(() => {
  return router.options.routes
    .filter(route => route.path !== '/:catchAll(.*)*') // Ignora a rota catch-all (erro)
    .map(route => ({
      path: route.path,
      // Garante que route.name seja uma string ou um valor padrão
      name: typeof route.name === 'string' ? route.name : 'Sem nome', 
      icon: typeof route.meta?.icon === 'string' ? route.meta?.icon : 'Sem nome', 
      caption: typeof route.meta?.caption === 'string' ? route.meta?.caption : 'Sem nome', 
    }));
});

// Função para alternar o estado do drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
