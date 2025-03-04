<script lang="ts" setup>
import BreadcrumbsComponent from 'src/components/BreadcrumbsComponent.vue';
import ModalComponent from 'src/components/ModalComponent.vue';
import FormJogadoresComponent from 'src/components/FormJogadoresComponent.vue';
import type IJogador from 'src/interfaces/IJogador';
import { onMounted, ref } from 'vue';
import jogadoresService from 'src/services/jogadores';

const jogadores = ref<IJogador[]>([])

const { index } = jogadoresService();

const breadcrumbs = [
  { label: "Home", icon: "home", url: "/" },
  { label: "Jogadores", icon: "people"},
];

// Listagem Jogadores
const columns = [
    { name: 'nome', align: 'center' as const, label: 'Nome', field: 'nome', sortable: true },
    { name: 'posicao', align: 'center' as const, label: 'Posicao', field: 'posicao', sortable: true },
    { name: 'email', align: 'center' as const, label: 'Email', field: 'email', sortable: true },
    { name: 'nivel', align: 'center' as const, label: 'Nivel', field: 'nivel', sortable: true },
];

const carregarJogadores = async () => {

    try{
        const data = await index();
        jogadores.value = data.dados
    }catch(erro){
        console.error('Erro ao busca jogadores:', erro)
    }

};

//cadastro jogador
const modalAberta = ref(false);

const fecharModal = async () => {
    modalAberta.value = false
    await carregarJogadores()
}

onMounted(() => {
    void carregarJogadores();
})

</script>

<template>
    <q-page class="column q-pa-md full-width full-height">

        <BreadcrumbsComponent :itens="breadcrumbs"/>
        
        <ModalComponent :modalAberta="modalAberta">
            <FormJogadoresComponent @fechar="fecharModal"/>
        </ModalComponent>
        
        <div class="q-pa-md">
            <q-btn label="Novo Jogador" color="primary" @click="modalAberta = true" />
        </div>
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