<template>
    <div @dragover="onDragOver" @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragExit" class="shift"
        :class="{ 'filled': servers.length == 2, 'partial': servers.length == 1, 'empty': servers.length == 0, 'bg-green-200': isOver && dropAllowed, 'bg-red-200': isOver && !dropAllowed }">
        <span class="shiftNo">{{ shift }}</span>
        <img v-for="i in svrSlots" :key="`${servers[i - 1] ?? i}`" :src="getImgUrl(servers[i - 1])"
            :alt="getImgAlt(servers[i - 1])" :title="initialCaps(getImgAlt(servers[i - 1]))"
            :class="{ greyedOut: greyedOut(servers[i-1]), halo: highlightedServer == servers[i-1] }" :style="{ opacity: servers[i - 1] ? '1' : '.15' }"
            @dragstart="onDragStart($event, servers[i - 1])" @dragend="onDragEnd" />
    </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { initialCaps } from '@/composables/textUtils';
import { date2key } from '@/composables/calUtils';
import { useShiftSchedulesStore } from '@/stores/shiftSchedules';

const props = defineProps({
    date: { type: Date, required: true },
    shift: { type: Number, required: true }
});

const eventData = inject('eventData');
const highlightedServer = inject('highlightedServer');
const shiftSchedulesStore = useShiftSchedulesStore();

const shiftKey = date2key(props.date) + '.' + props.shift;
const svrSlots = 2;
const servers = shiftSchedulesStore.getServersByShiftID(shiftKey);
const dragCounter = ref(0);
const isOver = ref(false);
const dropData = ref('');
const dropAllowed = computed(() => {
    return servers.value.length < 2 && !servers.value.some(svr => svr == dropData.value)
});

function greyedOut(serverId) {
    
    if (highlightedServer.value && serverId) {
        if (serverId !== highlightedServer.value) {
            return true;
        }
    }

    return false;
};


function getImgUrl(server) {
    if (server) {
        return `./avatars/${server}.svg`
    }

    return './avatars/tbd.svg'
}

function getImgAlt(server) {
    if (server) {
        return server
    }

    return 'TBD'
}

function onDrop(event) {
    event.preventDefault();

    if (dropAllowed.value) {
        shiftSchedulesStore.addAssigment(shiftKey, eventData.getData());
        eventData.setValidDrop();
    }

    isOver.value = false;
    dropData.value = '';
    dragCounter.value = 0;
}

function onDragEnter(event) {
    event.preventDefault();

    if (eventData.getOptions()?.src != shiftKey) {
        dragCounter.value++;
        isOver.value = dragCounter.value > 0;
    }
}

function onDragExit(event) {
    event.preventDefault();

    if (eventData.getOptions()?.src != shiftKey) {
        dragCounter.value = Math.max(0, dragCounter.value - 1);
        isOver.value = dragCounter.value > 0;
        dropData.value = '';
    }
}

function onDragStart(event, server) {
    if (server) {
        eventData.set(server, { src: shiftKey, removable: true });
    } else {
        event.preventDefault();
    }
}

function onDragEnd(event) {
    event.preventDefault();

    if (eventData.getOptions()?.src == shiftKey && eventData.getOptions()?.validDrop) {
        shiftSchedulesStore.removeAssignment(shiftKey, eventData.getData());
    }
    
    eventData.cleanup();

}

function onDragOver(event) {
    event.preventDefault();

    if (eventData.getOptions()?.src != shiftKey) {
        dropData.value = eventData.getData();
    }
}

</script>

<style lang="postcss" scoped>
.shift {
    @apply flex flex-1 flex-row flex-grow justify-between pr-3 items-center m-1 border-l border-b relative;

    &.filled {
        @apply border-green-500 border-l-4;
    }

    &.partial {
        @apply border-yellow-400 border-l-4;
    }

    &.empty {
        @apply border-red-400 border-l-4;
    }

    img {
        @apply h-8 w-8 object-contain;
    }
}

.shiftNo {
    @apply ml-1 text-sm self-start;
}

.greyedOut {
    @apply grayscale !opacity-40;
}

.halo {
    @apply bg-yellow-200 rounded-xl;
}
</style>