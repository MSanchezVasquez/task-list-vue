<template>
  <div class="task">
    <div class="task-left">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="taskStore.toggleComplete(task.id)"
      />
      <h3 :class="{ completed: task.completed }">{{ task.title }}</h3>
    </div>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">
        delete
      </i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFav(task.id)"
      >
        favorite
      </i>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "../stores/taskStore";

export default {
  props: ["task"],
  setup() {
    const taskStore = useTaskStore();

    return { taskStore };
  },
};
</script>
