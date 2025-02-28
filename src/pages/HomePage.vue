<script setup lang="ts">

    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

</script>
<template>
<div class="q-pa-md row items-start q-gutter-md">
    <q-page class="column q-pa-md full-width full-height">
        <q-card class="my-card">
            <q-card-section>
                {{ lorem }}
            </q-card-section>
        </q-card>
    </q-page>
</div>
</template>
