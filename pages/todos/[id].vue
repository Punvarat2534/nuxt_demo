<script setup>
  const route = useRoute();
  const todoId = route.params.id;

  const BASE_URL = "https://<id จากเว็บ mock api>.mockapi.io";

  const { pending, data: todo } = useFetch(`${BASE_URL}/todos/${todoId}`, {
    lazy: true,
  });
  E;
</script>

<template>
  <nuxt-link to="/">Back</nuxt-link>
  <div v-if="pending">Loading</div>
  <div v-else>
    <div>Todo {{ todo.id }}</div>
    <div>{{ todo.name }}</div>
  </div>
</template>