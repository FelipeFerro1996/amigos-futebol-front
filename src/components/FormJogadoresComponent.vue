<script lang="ts" setup>
    import type IJogador from 'src/interfaces/IJogador';
    import { ref, defineEmits } from 'vue';
    import { useQuasar } from "quasar";
    import { type AxiosError } from 'axios';
    import jogadoresService from 'src/services/jogadores';

    const $q = useQuasar();
    const {post} = jogadoresService();

    const emit = defineEmits(["fechar"])

    const loading = ref(false);

    const form = ref<IJogador>({
        nome: "",
        posicao: "",
        nivel: 0,
        email:""
    });

    const salvar = async () => {
        try{
            loading.value = true;
            const response = await post(form.value)
            console.log(response)
            $q.notify({
                type: "positive",
                message: "Jogador cadastrado com sucesso"
            })
            emit("fechar")
        }catch(error){
            const err = error as AxiosError<{ errors: Record<string, string[]> }>;
            if(err.response && err.response.status === 422){
                const errors = err.response.data.errors;

                Object.values(errors).forEach((mensagens) => {
                    mensagens.forEach((mensagem) => {
                        $q.notify({
                            type: "negative",
                            message: mensagem
                        });
                    });
                });
            }

        }finally{
            loading.value = false
        }
    }

</script>

<template>
    <q-card style="width: 400px">
        <q-card-section>
            <div class="text-h6">Cadastrar Jogador</div>
        </q-card-section>

        <q-form @submit.prevent="salvar">
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
                <q-btn type="submit" label="Salvar" color="primary" :loading="loading"/>
            </q-card-actions>
        </q-form>
        
    </q-card>
</template>