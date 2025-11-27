<template>
  <div class="task">
    <div class="task-left">
      <input
        :id="`task-${task.id}`"
        type="checkbox"
        :checked="task.completed"
        @change="taskStore.toggleComplete(task.id)"
        aria-label="Marcar tarea como completada"
      />
      <label
        :for="`task-${task.id}`"
        class="task-title"
        :class="{ completed: task.completed }"
      >
        {{ task.title }}
      </label>
    </div>
    <div class="icons">
      <button
        class="btn-icon"
        @click="taskStore.deleteTask(task.id)"
        aria-label="Eliminar tarea"
      >
        <i class="material-icons" aria-hidden="true">delete</i>
      </button>
      <button
        class="btn-icon"
        @click="taskStore.toggleFav(task.id)"
        :aria-label="task.isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'"
      >
        <i
          class="material-icons"
          :class="{ active: task.isFav }"
          aria-hidden="true"
        >
          favorite
        </i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/taskStore";
const props = defineProps(["task"]);
const taskStore = useTaskStore();
</script>

<style scoped>
.task-title {
  font-size: 1.17em;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}

.task-title.completed {
  text-decoration: line-through;
  color: #999999a6;
}

.material-icons {
  font-size: 1.4em;
  color: #bbb;
  transition: color 0.2s ease;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  transition: transform 0.2s ease, color 0.2s ease;
}

.material-icons:hover {
  transform: scale(1.3);
}

.material-icons.active {
  color: #ff005d;
}

.btn-icon:hover .material-icons {
  color: #555;
}
.btn-icon:hover .material-icons.active {
  color: #d1004b;
}
</style>
