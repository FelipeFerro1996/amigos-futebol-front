<script lang="ts" setup>
import type { PropType } from 'vue';


interface BreadCrumbsItens{
    label: string,
    icon?:string,
    url?:string
}

defineProps({
    itens: {
        type: Array as PropType<BreadCrumbsItens[]>,
        required: true,
        default: () => []
    }
});

</script>

<template>
    <!-- Breadcrumb (Miolo de Pão) -->
    <q-breadcrumbs class="q-mb-md">
        <q-breadcrumbs-el v-for="item in itens" :key="item.label" :label="item.label" :icon="item.icon" :to="item.url" />
    </q-breadcrumbs>
</template>