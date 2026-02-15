<template>
  <div class="relative">
    <div class="cal-day" :class="{
      'cal-day--selected': selected,
      'cal-day--today': isToday,
      'cal-day--other-month': !inMonth
    }" @click="onDayClick">
      <span class="day-number">{{ day.getDate() }}</span>

      <div class="cal-day-content">
        <ShiftView :date="day" v-for="shift in numberShifts" :shift="shift" />
      </div>
    </div>
    <div v-if="!inMonth" class="absolute inset-0 bg-transparent z-20 cursor-not-allowed">
    </div>
  </div>
</template>

<script setup>
import ShiftView from "./ShiftView.vue";

const props = defineProps({
  day: { type: Date, required: true },
  selected: { type: Boolean, default: false },
  inMonth: { type: Boolean, default: true },
  isToday: { type: Boolean, default: false },
});

const emit = defineEmits(["select-day"]);

const numberShifts = 2;

function onDayClick() {
  emit("select-day", props.day);
}
</script>

<style lang="postcss" scoped>
.cal-day {
  @apply relative flex flex-col p-1 border border-sky-200 min-h-[100px] h-full flex-1 min-w-[120px] bg-white hover:bg-gray-50;
}

.cal-day--today {
  @apply border-blue-500 z-10;
}

/* this has been commented out becuase it's not directly used. If you added functioanlity for a selected date, this would be used. /*
/* .cal-day--selected {
  @apply bg-blue-50 z-10;
} */

.cal-day--other-month {
  @apply text-gray-200 opacity-50 bg-gray-50;
}

.cal-day-content {
  @apply flex flex-col flex-1 mt-[1em] ml-[1.5em];
}

.day-number {
  @apply absolute top-1 left-1 text-sm text-blue-500 font-semibold;

}

.cal-day--other-month .day-number {
  @apply text-gray-400;
}
</style>
