<script lang="ts" setup>
import { computed } from 'vue';


const props = withDefaults(
    defineProps<{
        modalAberta: boolean
    }>(),
    {
        modalAberta: false
    }
);

const modalAbertaComputed = computed({
    get: () => props.modalAberta,
    set: (value) => emit('update:modalAberta',value)
})

const emit = defineEmits([
    "update:modalAberta"
])

</script>

<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="modalAbertaComputed" persistent>
            <slot></slot>                       
        </q-dialog>
    </div>
</template>