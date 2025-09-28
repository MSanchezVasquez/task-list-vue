<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="I need to..."
      v-model.trim="newTask"
      :class="{ error: hasError }"
    />
    <button :disabled="!newTask">Add</button>
    <p v-if="hasError" class="error-msg">
      Task must be at least 3 characters long.
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

export default {
  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");
    const hasError = ref(false);

    const handleSubmit = () => {
      if (newTask.value.length < 3) {
        hasError.value = true;
        return;
      }
      hasError.value = false;

      taskStore.addTask({
        title: newTask.value,
      });

      newTask.value = "";
    };

    return { handleSubmit, newTask, hasError };
  },
};
</script>

<style scoped>
input.error {
  border: 2px solid #ff4d4f;
}
.error-msg {
  color: #ff4d4f;
  font-size: 0.85em;
  margin-top: 4px;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
