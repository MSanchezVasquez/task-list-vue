import { defineStore } from "pinia";
import { ref, computed } from "vue";

const API_URL = "https://json-server-backend-wgym.onrender.com/tasks";

// Sintaxis Setup Store: (id, setupFunction, options)
export const useTaskStore = defineStore(
  "taskStore",
  () => {
    const tasks = ref([]);
    const loading = ref(false);

    const favs = computed(() => tasks.value.filter((t) => t.isFav));

    const favCount = computed(() =>
      tasks.value.reduce((p, c) => (c.isFav ? p + 1 : p), 0)
    );

    const totalCount = computed(() => tasks.value.length);

    const pendingCount = computed(
      () => tasks.value.filter((t) => !t.completed).length
    );

    const completed = computed(() => tasks.value.filter((t) => t.completed));

    const completedCount = computed(() =>
      tasks.value.reduce((p, c) => (c.completed ? p + 1 : p), 0)
    );

    const filteredTasks = computed(() => {
      return (filter) => {
        if (filter === "favs") return favs.value;
        if (filter === "compl") return completed.value;
        return tasks.value;
      };
    });

    const getTasks = async () => {
      loading.value = true;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(res.statusText);

        const serverTasks = await res.json();

        // Mantenimiento de tareas ya existentes
        const localTasks = tasks.value;

        // Merge: se añaden solo las que no existen
        const merged = [...localTasks];

        for (const st of serverTasks) {
          if (!merged.find((lt) => lt.id === st.id)) {
            merged.push(st);
          }
        }

        tasks.value = merged;
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      } finally {
        loading.value = false;
      }
    };

    const addTask = async (task) => {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ ...task, isFav: false, completed: false }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const newTask = await res.json();
        tasks.value.push(newTask);
      } else {
        console.log("Error al agregar:", res.statusText);
      }
    };

    const deleteTask = async (id) => {
      const taskIndex = tasks.value.findIndex((t) => t.id === id);
      const taskToDelete = tasks.value[taskIndex];

      if (taskIndex === -1) return;

      tasks.value.splice(taskIndex, 1);

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al borrar en servidor");
      } catch (error) {
        console.error("Rollback:", error);
        tasks.value.splice(taskIndex, 0, taskToDelete);
        alert("No se pudo eliminar la tarea");
      }
    };

    const toggleFav = async (id) => {
      const task = tasks.value.find((t) => t.id === id);
      if (!task) return;

      task.isFav = !task.isFav;

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Error sync fav");
      } catch (error) {
        console.error("Rollback:", error);
        task.isFav = !task.isFav; // Revertir cambio
      }
    };

    const toggleComplete = async (id) => {
      const task = tasks.value.find((t) => t.id === id);
      if (!task) return;

      // Optimistic UI (ya lo tenías bien, lo mantenemos)
      const prev = task.completed;
      task.completed = !prev;

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ completed: task.completed }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(res.statusText);
      } catch (err) {
        console.error("Rollback:", err);
        task.completed = prev;
      }
    };

    // Retornamos todo lo que queremos exponer
    return {
      tasks,
      loading,
      favs,
      favCount,
      totalCount,
      pendingCount,
      completed,
      completedCount,
      filteredTasks,
      getTasks,
      addTask,
      deleteTask,
      toggleFav,
      toggleComplete,
    };
  },
  // TERCER ARGUMENTO: Aquí van las opciones de plugins
  {
    persist: {
      paths: ["tasks"],
    },
  }
);
