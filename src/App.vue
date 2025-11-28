<script setup>
import TaskDetails from "./components/TaskDetails.vue";
import { defineAsyncComponent, ref, computed, onMounted } from "vue";
import { useTaskStore } from "./stores/taskStore";
import { storeToRefs } from "pinia";

const TaskForm = defineAsyncComponent(() =>
  import("./components/TaskForm.vue")
);

const taskStore = useTaskStore();

const {
  tasks,
  loading,
  favs,
  totalCount,
  pendingCount,
  favCount,
  completed,
  completedCount,
  filteredTasks,
} = storeToRefs(taskStore);

// fetch tasks
onMounted(() => {
  taskStore.getTasks();
});

const filter = ref("all");

const sortedTasks = computed(() => {
  return filteredTasks
    .value(filter.value)
    .slice()
    .sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
});
</script>

<template>
  <main>
    <!-- heading -->
    <header>
      <img
        src="https://pinia.vuejs.org/logo.svg"
        alt="pinia logo"
        width="50"
        height="50"
        fetchpriority="high"
      />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All tasks
      </button>

      <button :class="{ active: filter === 'favs' }" @click="filter = 'favs'">
        Fav tasks
      </button>

      <button :class="{ active: filter === 'compl' }" @click="filter = 'compl'">
        Completed tasks
      </button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div v-if="!loading && tasks.length === 0" class="empty">
      No hay tareas aún, añade una ✍️
    </div>
    <div class="task-list" v-else>
      <p>
        Total tasks: <span>{{ totalCount }}</span>
      </p>
      <p>
        Pending: <span>{{ pendingCount }}</span>
      </p>
      <p>
        Completed: <span>{{ completedCount }}</span>
      </p>

      <transition-group name="list" tag="div">
        <div v-for="task in sortedTasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </transition-group>
    </div>

    <!-- <button @click="taskStore.$reset">reset the state</button> -->
  </main>
</template>

<style scoped>
.empty {
  text-align: center;
  color: #777;
  margin-top: 20px;
  font-style: italic;
}
.list-move {
  transition: transform 0.3s ease;
}
</style>
