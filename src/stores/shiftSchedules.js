import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useShiftSchedulesStore = defineStore('shiftSchedules', () => {

    const shiftSchedules = ref([]);

    // Not used here but added for reference
    // interface shiftSchedule {
    //     shiftID: string;
    //     serverID: string;
    // }

    function addAssigment(shiftID, serverID) {
        shiftSchedules.value.push({shiftID, serverID})
    }

    function removeAssignment(shiftID, serverID) {
        let idx = shiftSchedules.value.findIndex( s => (s.shiftID == shiftID && s.serverID == serverID));
        if (idx > -1) {
            shiftSchedules.value.splice(idx, 1);
        }
    }

    function getServersByShiftID(shiftID) {
        return computed(() => 
            shiftSchedules.value.filter( s => s.shiftID == shiftID).map( s => s.serverID)
        )
    }

    function getAssignmentsByServerIDforMonth(serverID, month) {
        // Note: 'month' param is actually a year+month. It's the key into the shiftSchedules
        // it must be in the format 'YYYYMM'
        return computed(() => 
            shiftSchedules.value.filter( s => (s.serverID == serverID && s.shiftID.startsWith(month)))
        )

    }

    return { addAssigment, removeAssignment, getServersByShiftID, getAssignmentsByServerIDforMonth }
})