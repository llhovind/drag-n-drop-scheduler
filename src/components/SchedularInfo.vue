<script setup>
</script>

<template>
    <div>
        <p>Welcome to our Boutique Cafe. We are open seven days a week, 14 hours a day. This program will help you
            schedule our staff. <br /><br />
            In the Calendar grid are the days and shifts needed to be filled. On the right is the
            list of Servers to assign to those shifts. Just <span class="break-keep">Drag-n-Drop</span> a Server onto a
            shift.<br />
        </p>
        <ul class="list-disc ml-8">
            <li>If the assignment is
                allowed the shift's background will turn <span class="bg-green-200">green</span>. Just Drop the Server
                onto the shift to assign.</li>
            <li>If the
                assignment is disallowed, the background turns <span class="bg-red-200">red</span>.
                This would be the case if the shift is full or the Server is already assigned to that shift.</li>
                <li>You can move a Server from one shift to another by dragging the icon to an open shift.</li>
            <li>If you want to remove a Server from a shift, just drag them into the "Remove" box in the lower right corner. </li>
        </ul>
        <p class="mt-2">Servers can be highlighted by clicking on the visibility icon in the top right of the Server's box.
             To remove the highlight click the icon again. To switch Server click the new Server's icon.</p>

        
    </div>
</template>

<style lang="postcss" scoped></style>