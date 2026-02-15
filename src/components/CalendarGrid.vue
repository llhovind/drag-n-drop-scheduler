<template>
  <div class="calendar-container">
    <!-- Header / navigation -->
    <div class="calendar-header">
      <button @click="prevMonth" class="nav-button" title="Previous Month">&#x2B9C;</button>
      <div class="month-label">{{ format(currentMonth, "MMMM yyyy") }}</div>
      <button @click="nextMonth" class="nav-button" title="Next Month">&#x2B9E;</button>
    </div>

    <!-- Calendar grid -->
    <div class="calendar-grid-wrapper">
      <div class="calendar-grid">
        <!-- Weekday labels as first row -->
        <div v-for="(wd, i) in weekdays" :key="'wd-' + i" class="weekday-cell">
          {{ wd }}
        </div>

        <!-- Calendar day cells -->
        <CalDay v-for="(day, i) in days" :key="date2key(day)" :day="day" :selected="isSelected(day)"
          :inMonth="day.getMonth() === currentMonth.getMonth()" :isToday="isDateToday(day)" @select-day="selectDay" />
      </div>
    </div>

    <!-- Remove Panel -->
    <div class="removePanel transition-[bottom] duration-300" :class="{ isOver: isOver, showPanel: showPanel }"
      @drop="onDrop" @dragenter="onDragEnter" @dragover="onDragOver" @dragexit="onDragExit">
      <svg v-if="dustKey" :key="dustKey" viewBox="0 0 200 120" class="absolute inset-0 w-full h-full
             animate-dustBurst
             text-blue-400">
        <ellipse cx="100" cy="60" rx="18" ry="10" class="animate-dust1" opacity="0.4" fill="white" />
        <ellipse cx="100" cy="60" rx="22" ry="12" class="animate-dust2" opacity="0.5" fill="white" />
        <ellipse cx="100" cy="60" rx="16" ry="9" class="animate-dust3" opacity="0.4" fill="white" />
        <ellipse cx="100" cy="60" rx="20" ry="11" class="animate-dust4" opacity="0.5" fill="white" />

        <text x="100" y="66" text-anchor="middle" font-size="28" font-weight="600" class="animate-poofText"
          fill="#7B81ED">
          Poof
        </text>
      </svg>
      <p v-if="!dustKey">Drop here to remove</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { startOfMonth, startOfWeek, addDays, addMonths, format, isToday as dfIsToday, isSameDay, startOfDay } from "date-fns";
import { TZDate } from "@date-fns/tz"
import { date2key } from "@/composables/calUtils";
import CalDay from "./CalDay.vue";

const eventData = inject('eventData');
const currentMonth = inject('currentMonth');

const dragCounter = ref(0);
const isOver = ref(false);
const dustKey = ref(0);
const TZ_here = 'America/New_York';
const today_here = new TZDate(new Date(), TZ_here);
currentMonth.value = today_here;

const selectedDate = ref(today_here);

const weekdays = Array.from({ length: 7 }, (_, i) =>
  format(addDays(startOfWeek(today_here, { weekStartsOn: 0 }), i), "EEE")
);

const days = computed(() => {
  const monthStart = startOfDay(startOfMonth(currentMonth.value));
  const start = startOfWeek(monthStart, { weekStartsOn: 0 });
  return Array.from({ length: 42 }, (_, i) => startOfDay(addDays(start, i)));
});

function prevMonth() { currentMonth.value = addMonths(currentMonth.value, -1); }
function nextMonth() { currentMonth.value = addMonths(currentMonth.value, 1); }
function selectDay(day) { selectedDate.value = day; }
function isSelected(day) { return selectedDate.value && isSameDay(day, startOfDay(selectedDate.value)); }
function isDateToday(day) { return isSameDay(day, startOfDay(new TZDate(new Date(), TZ_here))); }

const showPanel = computed(() => {
  return eventData.getOptions()?.removable || dustKey.value;
});

function onDrop(event) {
  event.preventDefault();

  eventData.setValidDrop();
  dragCounter.value = 0;
  isOver.value = false;
  
  dustKey.value++;
  // delay to show animation
  setTimeout(() => {
    dustKey.value = 0;
  }, 550);
}

function onDragEnter(event) {
  event.preventDefault();

  dragCounter.value++;
  isOver.value = dragCounter.value > 0;
}

function onDragExit(event) {
  event.preventDefault();

  dragCounter.value = Math.max(0, dragCounter.value - 1);
  isOver.value = dragCounter.value > 0;
}

function onDragOver(event) {
  event.preventDefault();
}

</script>

<style lang="postcss" scoped>
/* Container: fills viewport vertically, centered */
.calendar-container {
  @apply relative flex flex-col w-full p-2 bg-gray-200 overflow-hidden;
}

/* Header + navigation */
.calendar-header {
  @apply relative flex justify-between items-center mb-2 flex-shrink-0 bg-blue-200;
}

.nav-button {
  @apply px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 border-2 border-blue-200;
}

.month-label {
  @apply font-semibold text-lg truncate;
}

/* Scrollable wrapper */
.calendar-grid-wrapper {
  @apply flex-1 min-h-0 w-full overflow-auto flex flex-col relative;
}

/* Grid layout: weekdays + days */
.calendar-grid {
  @apply grid w-full h-full flex-1;
  grid-template-rows: auto repeat(6, minmax(100px, 1fr));
  grid-template-columns: repeat(7, minmax(120px, 1fr));
}

/* Weekday labels */
.weekday-cell {
  @apply text-center font-semibold text-gray-500 p-1 pb-0 bg-white sticky top-0 z-10 border-sky-200 border;
}

.removePanel {
  position: absolute;
  bottom: -8rem;
  right: 0;
  z-index: 100;
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: lightgray;
  border: 3px dotted gray;
  border-radius: 12px;
  padding: 2rem;
  width: 18rem;
  height: 6rem;
  opacity: 0.8;

  &.isOver {
    opacity: 0.5;
  }

  &.showPanel {
    bottom: 0;
  }
}
</style>
