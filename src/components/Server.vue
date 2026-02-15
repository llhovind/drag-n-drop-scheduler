<template>
    <div>
        <div class="server" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
            <div class="visibilityicon" :class="isVisible ? 'text-black' : 'text-gray-300'"
                @click="toggleVisibility">&#x1F441;</div>
            <div class="imagewrapper">
                <img :src="getImgUrl(serverId)" draggable="false" />
                <div>{{ initialCaps(serverId) }}</div>
            </div>
            <div class="info">
                <div class="shifts">{{ shiftsPerMonth }}</div>
                <div class="label">shifts /mon</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { inject, computed } from 'vue';
import { initialCaps } from '@/composables/textUtils';
import { format } from 'date-fns';
import { useShiftSchedulesStore } from '@/stores/shiftSchedules';

const props = defineProps({
    serverId: { type: String, required: true },
});

const eventData = inject('eventData');
const currentMonth = inject('currentMonth');
const highlightedServer = inject('highlightedServer');
const shiftSchedulesStore = useShiftSchedulesStore();

const yrMon = computed(() => format(currentMonth.value, 'yyyyMM'))
const shiftsPerMonth = computed(() => shiftSchedulesStore.getAssignmentsByServerIDforMonth(props.serverId, yrMon.value).value.length);

const isVisible = computed(() => highlightedServer.value == props.serverId);

function toggleVisibility() {
    if (highlightedServer.value == props.serverId) {
        highlightedServer.value = '';
    } else {
        highlightedServer.value = props.serverId;
    }
}

function getImgUrl(server) {
    if (server) {
        return `./avatars/${server}.svg`
    }

    return './avatars/tbd.svg'
}

function onDragStart(event) {
    eventData.set(props.serverId, { src: 'server' });
}

function onDragEnd(event) {
    event.preventDefault();
    eventData.cleanup();
}

</script>
<style lang="postcss" scoped>
.server {
    @apply size-[120px];
    @apply bg-sky-100 border-4 border-blue-600 rounded-lg m-2 items-center p-2 relative flex justify-end;

    .visibilityicon {
        @apply absolute top-0 right-1 cursor-pointer;
    }

    .imagewrapper {
        @apply w-3/5 text-center;

        img {
            @apply w-full h-full object-contain;
        }
    }
    
    .info {
        @apply w-2/5 ml-2;

        .shifts {
            @apply text-lg font-bold text-right pr-1;
        }

        .label {
            @apply text-xs;
        }
    }

}
</style>