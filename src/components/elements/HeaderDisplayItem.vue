<template>
  <div class="mx-6">
      <h4 class="text-xs text-white mb-0.5 tracking-wider">{{ header }}</h4>
      <h1 class="text-3xl font-bold text-white">{{ value }}</h1>
  </div>
</template>

<script>
export default {
    props: ['header', 'value'],
}
</script>
