<script lang="ts" setup>
import BreadcrumbsComponent from 'src/components/BreadcrumbsComponent.vue';
import ModalComponent from 'src/components/ModalComponent.vue';
import FormJogadoresComponent from 'src/components/FormJogadoresComponent.vue';
import type IJogador from 'src/interfaces/IJogador';
import { computed, onMounted, ref, watch } from 'vue';
import jogadoresService from 'src/services/jogadores';
import { useQuasar } from 'quasar';
import { useErrorHandler } from 'src/composables/errorHandler';
import { useConfirmation } from 'src/composables/confirmDialog';

const { handleError } =  useErrorHandler();

const $q = useQuasar();

const jogadores = ref<IJogador[]>([])

const jogadorSelecionado = ref<IJogador | null>(null);

const { index, remove } = jogadoresService();

const { confirm } = useConfirmation();

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
    { name: 'actions', align: 'center' as const, label: 'actions', field: 'actions', sortable: true },
];

const abrirEdicao = (jogador: IJogador) => {
    jogadorSelecionado.value = { ...jogador } as IJogador;
    modalAberta.value = true;
};

const abrirCadastro = () => {
    jogadorSelecionado.value = { id: 0, nome: '', posicao: '', nivel: 0, email: '' }
    modalAberta.value = true;
}

const pagination = ref({
    page:1, 
    rowsPerPage:10, 
    rowsNumber:0
})

const carregarJogadores = async () => {
    const { page, rowsPerPage } = pagination.value;
    try{
        $q.loading.show();
        const data = await index({
            page: page,
            rowsPerPage: rowsPerPage
        });

        pagination.value = {
            page: data.dados.current_page,
            rowsPerPage: data.dados.per_page,
            rowsNumber: data.dados.total
        }
        jogadores.value = data.dados.data
    }catch(erro){
        console.error('Erro ao busca jogadores:', erro)
    }finally{
        $q.loading.hide();
    }

};

const removeJogador = async (id: number) => {
  try {
    const confirmacao = await confirm('Deseja remover o jogador?');
    
    if (!confirmacao) return;
    
    $q.loading.show();
    await remove(id);
    await carregarJogadores();
    
    $q.notify({
      type: "positive",
      message: "Jogador excluído com sucesso"
    });
  } catch (error) {
    handleError(error);
  } finally {
    $q.loading.hide();
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

const pagesNumber = computed(() => {
  return Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
})

watch(() => pagination.value.page, async () => {
   await carregarJogadores()
})
</script>

<template>
    <q-page class="column q-pa-md full-width full-height">

        <BreadcrumbsComponent :itens="breadcrumbs"/>
        
        <ModalComponent :modalAberta="modalAberta">
            <FormJogadoresComponent 
                v-if="jogadorSelecionado" 
                :jogador="jogadorSelecionado"
                @fechar="fecharModal"/>
        </ModalComponent>
        
        <div class="q-pa-md">
            <q-btn label="Novo Jogador" color="primary" @click="abrirCadastro()" />
        </div>
        <div class="q-pa-md">

            <q-table
                title="Jogadores"
                :rows="jogadores"
                :columns="columns"
                v-model:pagination="pagination"
                row-key="id"
                hide-pagination
                >
                    <template v-slot:body-cell-actions="props">
                        <q-td key="actions" :props="props">
                            <q-btn icon="edit" color="primary" dense :size="'sm'" @click="abrirEdicao(props.row)" class="q-mx-sm"/>
                            <q-btn icon="delete" color="negative" dense :size="'sm'" @click="removeJogador(props.row.id)" class="q-mx-sm"/>
                        </q-td>
                    </template>
            </q-table>

            <div class="row justify-center q-mt-md">
             
                <q-pagination
                    v-model="pagination.page"
                    :max="pagesNumber"
                    :max-pages="3"
                    boundary-numbers
                    />
            </div>

        </div>

    </q-page>
</template>