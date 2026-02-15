<script setup>
import { ref, reactive, provide } from 'vue';
import CalendarGrid from './components/CalendarGrid.vue'
import ServerList from './components/ServerList.vue'
import InfoModal from './components/InfoModal.vue';
import SchedularInfo from './components/SchedularInfo.vue';

const eventData = reactive({
  data: '',
  options: {},
  getData() { return this.data; },
  getOptions() { return this.options; },
  set(val, options = {}) { this.data = val; this.options = options; },
  setValidDrop() { this.options = { ...this.options, validDrop: true } },
  cleanup() { this.data = undefined; this.options = {}; }
});
const currentMonth = ref('');
const highlightedServer = ref('');

provide('eventData', eventData);
provide('currentMonth', currentMonth);
provide('highlightedServer', highlightedServer);

const showInfo = ref(true);
const infoIcon = ref(null);

</script>

<template>
  <div class="h-screen flex flex-col ">
    <header>
      <button ref="infoIcon" @click="showInfo = true" class="absolute top-2 left-3 font-bold text-2xl">
        <img src="/assets/mono-gnome-info.svg" alt="&#x2622;" class="w-7 h-7"/>
      </button>
      <h2>Drag-n-Drop Scheduler</h2>
      <a href="https://github.com/llhovind/drag-n-drop-scheduler" target="_blank" class="githubLink"
        title="See Me on GitHub"><img src="/assets/github-mark.svg" alt="GitHub" /></a>
    </header>
    <InfoModal v-model="showInfo" :icon-ref="infoIcon">
      <SchedularInfo />
    </InfoModal>
    <div class="grow flex min-h-0 pt-2 lg:pl-2 lg:pr-2">
      <CalendarGrid class="flex-1 min-h-0 min-w-0" />
      <ServerList class="w-max h-[200px] lg:h-full lg:w-[200px] ml-2" />
    </div>
    <footer>&copy;2025-{{ new Date().getFullYear() }} <a href="http://www.hovind.com" target="_blank">Lawrence L
        Hovind</a></footer>
  </div>
</template>

<style scoped lang="postcss">
/* .app-container { */
/* Wide screens: Calendar + ServerList side by side */
/* @apply grid-cols-[1fr_auto] max-w-[1400px] mx-auto; */
/* } */

header {
  background-image: linear-gradient(to right, rgba(9, 9, 255, .9), rgba(128, 0, 128, .9));
  /* color: white;
   text-align: center;
   font-size: 1.05rem;
   margin-bottom: 5px;
   border: 2px solid gold;
   border-radius: 6px;
   box-shadow: 2px 3px 6px gray; */

  @apply shadow-[2px_3px_6px_gray] rounded-lg border-yellow-300 border-2 mb-1 text-base text-center;

  h2 {
    @apply text-yellow-300 font-bold text-2xl m-1;
  }
}

a.githubLink {
  /* position: absolute;
  top: 6px;
  right: 6px; */

  @apply absolute top-2 right-2;

  img {
    @apply w-7 h-7;
  }
}

footer {
  @apply text-xs text-gray-300 text-center;
}

@media (max-width: 800px) {
  .app-container {
    /* Narrow screens: Calendar on top, ServerList below */
    @apply grid-cols-1 grid-rows-[1fr_auto];
  }
}
</style>
