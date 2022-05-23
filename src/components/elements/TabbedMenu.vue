<template>
  <div class="text-md font-medium text-center text-grey_light border-b border-gray_light">
    <ul class="grid grid-cols-2 gap-px">
        <li @click="changeSelected(1)">
            <a href="#" :class=class_1 >Customize Parameters</a>
        </li>
        <li @click="changeSelected(2)">
            <a href="#" :class=class_2 >View Output</a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props : ["selected", "changeSelected"],
    data(){
        return {
            active: "inline-block w-full p-4 rounded-t-lg bg-primary_20 text-primary border-b-4 border-primary active",
            inactive: "inline-block w-full p-4 rounded-t-lg border-b-4 border-transparent hover:bg-primary_20 hover:border-primary",
        }
    },
    computed : {
        class_1: function (){
            return this.selected == 1 ? this.active : this.inactive;
        },
        class_2: function() {
            return this.selected == 2 ? this.active : this.inactive;
        }
    }
}
</script>