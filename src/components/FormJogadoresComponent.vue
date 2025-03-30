<script lang="ts" setup>
    import type IJogador from 'src/interfaces/IJogador';
    import { ref, defineEmits, watch } from 'vue';
    import { useQuasar } from "quasar";
    import jogadoresService from 'src/services/jogadores';
    import { useErrorHandler } from "src/composables/errorHandler";

    const { handleError } = useErrorHandler();
    const $q = useQuasar();
    const {post, update} = jogadoresService();
    const emit = defineEmits(["fechar"])
    const props = defineProps<{ jogador?: IJogador }>();
    const loading = ref(false);

    const form = ref<IJogador>({
        id:0,
        nome: "",
        posicao: "",
        nivel: 0,
        email:""
    });

    watch(
    () => props.jogador,
        (novoJogador) => {
            form.value = novoJogador
                ? { ...novoJogador }
                : { id: 0, nome: '', posicao: '', nivel: 0, email: '' };
        },
        { immediate: true }
    );

    const salvar = async () => {
        try {
            loading.value = true;
            await post(form.value);

            $q.notify({
                type: "positive",
                message: "Jogador cadastrado com sucesso"
            });
            emit("fechar");
        } catch (error) {
            handleError(error);
        } finally {
            loading.value = false;
        }
    };

    const atualizar = async () => {
        try {
            loading.value = true;
            await update(form.value);

            $q.notify({
                type: "positive",
                message: "Jogador atualizado com sucesso"
            });
            emit("fechar");
        } catch (error) {
            handleError(error);
        } finally {
            loading.value = false;
        }
    };


</script>

<template>
    <q-card style="width: 400px">
        <q-card-section>
            <div class="text-h6">Cadastrar Jogador</div>
        </q-card-section>

        <q-form @submit.prevent="form.id ? atualizar() : salvar() ">
            <q-card-section>
                <div class="q-pa-md">
                    <div class="q-gutter-md" >
                        <q-input 
                            v-model="form.nome" 
                            label="Nome" 
                            outlined 
                            lazy-rules
                            :rules="[val => !!val || 'Nome é obrigatório']"
                            hint="Nome e Sobrenome do jogador"
                        />

                        <q-input 
                            v-model="form.email" 
                            label="E-mail" 
                            outlined 
                            type="email" 
                            :rules="[val => val.includes('@') || 'E-mail inválido']"
                            hint="Email do jogador"
                        />

                        <q-input 
                            v-model="form.posicao" 
                            label="posicao" 
                            outlined 
                            type="text" 
                            :rules="[val => !!val || 'Posição é obrigatória']"
                            hint="Posição do jogador"
                        />

                        <q-input 
                            v-model="form.nivel" 
                            label="Nível" 
                            outlined 
                            lazy-rules
                            type="number" 
                            min="1" 
                            max="10" 
                            :rules="[val => !!val || 'Nível é obrigatória']"
                            hint="Nível do jogador (de 1 até 10)"
                        />
                    </div>
                </div>
            </q-card-section>
            
            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="negative" @click="emit('fechar')" />
                <q-btn type="submit" :label="form.id > 0 ? 'Atualizar' : 'Cadastrar'" color="primary" :loading="loading"/>
            </q-card-actions>
        </q-form>
        
    </q-card>
</template>