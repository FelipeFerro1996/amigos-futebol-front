<script lang="ts">
import { ref } from 'vue';

export default {
    data(){
        return {
            prompt: ref(false),
            address: ''
        }
    }
}
</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn label="Prompt" color="primary" @click="prompt = true" />
        <q-dialog v-model="prompt" persistent>
            <slot></slot>                       
        </q-dialog>
    </div>
</template>