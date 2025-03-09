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

        <q-space />

        <!-- Botão de Logout para usuários autenticados -->
        <q-btn 
          v-if="isAuthenticated" 
          flat 
          dense 
          label="Sair" 
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <!-- Gerar o menu dinamicamente com base nas rotas -->
        <EssentialLink
          v-for="route in filteredRoutes"
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
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import { useAuth } from '../composables/useAuth'; // Importando o composable de autenticação

const leftDrawerOpen = ref(false);
const { token, logout } = useAuth();
const router = useRouter();
const isAuthenticated = ref(!!token.value);

// Atualiza automaticamente caso o token mude
watchEffect(() => {
  isAuthenticated.value = !!token.value;
});

// Filtra as rotas principais que você deseja exibir no menu
const filteredRoutes = computed(() => {
  return router.getRoutes()
    .filter(route => route.path !== '/:catchAll(.*)*') // Ignora a rota catch-all (erro)
    .filter(route => route.meta?.requiresAuth) // Mostra apenas rotas públicas ou se estiver autenticado
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
