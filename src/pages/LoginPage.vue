<script setup lang="ts">

    import { ref } from 'vue';
    import { useAuth } from '../composables/useAuth';

    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const { login }  = useAuth();

    const handleLogin = async () => {
        loading.value = true;
        errorMessage.value = '';

        try {
            await login({email: email.value, password: password.value})
        } catch (error) {
            errorMessage.value = 'Email ou senha incorretos'
            console.log(error)
            loading.value = false
        }
    }

    const recoverPassword = () => {
        alert('Função de recuperação de senha ainda não foi implementada.');
    }

</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-page-container>
            <q-page class="flex flex-center">
                <q-card class="q-pa-md shadow-2 rouded-lg" style="width: 400px;">
                    <q-card-section>
                        <div class="text-h6 text-cente">Login</div>
                    </q-card-section>

                    <q-card-section>
                        <q-form @submit.prevent="handleLogin">
                            <q-input 
                                v-model="email"
                                label="E-mail"
                                type="email"
                                filled
                                dense
                                layz-rules
                                :rules="[val => !!val || 'O e-mail é obrigatório']"
                            />

                            <q-input
                                v-model="password"
                                label="Senha"
                                type="password"
                                filled
                                dense
                                lazy-rules
                                :rules="[val => !!val || 'A senha é obrigatória']"
                            />

                            <q-btn 
                                label="Entrar"
                                type="submit"
                                color="primary"
                                class="full-width q-mt-md"
                                :loading="loading"
                            />

                        </q-form>
                    </q-card-section>

                    <q-card-section class="text-center q-pt-none">
                        <q-btn 
                            flat
                            label="Esqueceu a senha?"
                            @click="recoverPassword"
                            size="sm"
                        />
                    </q-card-section>

                    <q-card-section v-if="errorMessage" class="text-red text-center">
                        {{ errorMessage }}
                    </q-card-section>

                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>