<template>
    <div class="listcontainer">
        <h1>Servers</h1>
        <div ref="serverList" class="server-list" @scroll="onScroll">
            <div class="scrollupicon" v-if="canScrollUp">&#x2B89;</div>
            <div class="scrolldownicon" v-if="canScrollDown">&#x2B8B;</div>
            <Server v-for="(server, i) in servers" :key="i" :serverId="server" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Server from './Server.vue';

const serverList = ref(null);
const scrollTop = ref(0);
const scrollHeight = ref(0)
const clientHeight = ref(0)

const servers = ref(["mary", "james", "patricia", "michael", "jennifer", "john", "linda", "robert"]);

onMounted(() => {
    if (!serverList.value) return;

    scrollHeight.value = serverList.value.scrollHeight
    clientHeight.value = serverList.value.clientHeight
})

function onScroll() {
    if (!serverList.value) return;

    scrollTop.value = serverList.value.scrollTop;
    scrollHeight.value = serverList.value.scrollHeight
    clientHeight.value = serverList.value.clientHeight
}

const canScrollUp = computed(() => scrollTop.value > 0)
const canScrollDown = computed(() => scrollTop.value + clientHeight.value < scrollHeight.value)

</script>

<style lang="postcss" scoped>
.listcontainer {
    @apply relative flex flex-row lg:flex-col items-center bg-amber-200;

    h1 {
        @apply mb-1 text-lg font-bold;
    }
    .server-list {
        @apply bg-blue-50 w-full flex flex-row lg:flex-col items-center overflow-auto border-t-gray-300 border-t-4;

        .scrollupicon {
            @apply absolute top-9 right-1 z-10 text-3xl;
        }

        .scrolldownicon {
            @apply absolute bottom-1 right-3 z-10 text-3xl;
        }
    }
}
</style>