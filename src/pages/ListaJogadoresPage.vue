<script lang="ts" setup>
import { api } from 'src/boot/axios';
import BreadcrumbsComponent from 'src/components/BreadcrumbsComponent.vue';
import type IJogador from 'src/interfaces/IJogador';
import { onMounted, ref } from 'vue';

const jogadores = ref<IJogador[]>([])

const breadcrumbs = [
  { label: "Home", icon: "home", url: "/" },
  { label: "Jogadores", icon: "people"},
];

const columns = [
    { name: 'nome', align: 'center' as const, label: 'Nome', field: 'nome', sortable: true },
    { name: 'posicao', align: 'center' as const, label: 'Posicao', field: 'posicao', sortable: true },
    { name: 'email', align: 'center' as const, label: 'Email', field: 'email', sortable: true },
    { name: 'nivel', align: 'center' as const, label: 'Nivel', field: 'nivel', sortable: true },
];

const carregarJogadores = async () => {

    try{
        const response = await api.get('/jogadores');
        console.log(response.data)
        jogadores.value = response.data.dados
    }catch(erro){
        console.error('Erro ao busca jogadores:', erro)
    }

};

onMounted(() => {
    void carregarJogadores();
})

</script>

<template>
    <q-page class="column q-pa-md full-width full-height">

        <BreadcrumbsComponent :itens="breadcrumbs"/>

        <div class="q-pa-md">
            <q-table
            title="Treats"
            :rows="jogadores"
            :columns="columns"
            row-key="name"
            />
        </div>

    </q-page>
</template>