<script setup>
const route = useRoute()
const todoId = route.params.id;
</script>

<template>
  <div>
    <h1> {{todoId}}</h1>
    <p>  {{todoId}}</p>
  </div>
  <button @click="$router.back()">Back</button>

  <UModal
    title="Modal with close button"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
  >
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </UModal>

</template>
