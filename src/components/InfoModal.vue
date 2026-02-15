<template>
    <transition name="grow">
        <div v-if="modelValue" class="modal" :style="modalStyle" @click.self="close">
            <div class="modalref">
                <slot>
                    <h2 class="text-xl font-semibold mb-2">Information</h2>
                    <p class="mb-4 text-gray-700">
                        This is the default content of the modal.
                    </p>
                </slot>

                <div class="actionbar">
                    <button class="closebtn" @click="close">
                        Close
                    </button>
                    <p class="info">This info is always available by clicking the Info Icon
                        <img src="/assets/mono-gnome-info.svg" class="infoicon"/> in the upper left corner.
                    </p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
    modelValue: { type: Boolean, required: true },
    iconRef: { type: Object, required: false }
})
const emit = defineEmits(['update:modelValue'])

const modalStyle = reactive({
    transformOrigin: 'top left'
})

function close() {
    emit('update:modelValue', false)
}

</script>

<style lang="postcss" scoped>
.grow-enter-active,
.grow-leave-active {
    transition: transform 0.5s ease, opacity 0.25s ease;
}

.grow-enter-from,
.grow-leave-to {
    @apply scale-0 opacity-0;
}

.grow-enter-to,
.grow-leave-from {
    @apply scale-100 opacity-100;
}

.modal {
    @apply fixed inset-0 flex items-center justify-center bg-black/40 z-30;

    .modalref {
        @apply bg-white rounded-2xl p-6 max-w-4xl min-w-60 shadow-lg;

        .actionbar {
            @apply mt-8;

            .info {
                @apply mt-8 mr-24 text-right;
            }

            .infoicon {
                @apply w-6 h-6 inline;
            }

            .closebtn {
                @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg float-right;
            }
        }
    }
}
</style>
