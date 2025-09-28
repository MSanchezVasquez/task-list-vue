import { defineStore } from "pinia";

const API_URL = "https://json-server-backend-wgym.onrender.com/tasks";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
    pendingCount() {
      return this.tasks.filter((t) => !t.completed).length;
    },
    completed() {
      return this.tasks.filter((t) => t.completed);
    },
    completedCount() {
      return this.tasks.reduce((p, c) => {
        return c.completed ? p + 1 : p;
      }, 0);
    },
    filteredTasks: (state) => {
      return (filter) => {
        if (filter === "favs") return state.tasks.filter((t) => t.isFav);
        if (filter === "compl") return state.tasks.filter((t) => t.completed);
        return state.tasks; // default: "all"
      };
    },
  },

  actions: {
    async getTasks() {
      this.loading = true;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(res.statusText);
        this.tasks = await res.json();
      } catch (err) {
        console.error("Error al cargar tareas:", err);
      } finally {
        this.loading = false;
      }
    },
    async addTask(task) {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ ...task, isFav: false, completed: false }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const newTask = await res.json(); // aquí viene el id generado
        this.tasks.push(newTask);
      } else {
        console.log("Error al agregar:", res.statusText);
      }
    },
    async deleteTask(id) {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // solo si el backend confirma borramos en el estado
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } else {
        console.log("Error al eliminar:", res.statusText);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task) return;

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: !task.isFav }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        task.isFav = !task.isFav;
      } else {
        console.log("Error al actualizar:", res.statusText);
      }
    },
    async toggleComplete(id) {
      const task = this.tasks.find((t) => t.id === id);
      if (!task) return;

      const prev = task.completed;
      task.completed = !prev; // actualizar al toque (optimistic)

      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ completed: task.completed }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(res.statusText);
      } catch (err) {
        console.error("Error al actualizar:", err);
        task.completed = prev; // revertir si falla
      }
    },
  },
  // ¡Aquí se activa la magia!
  persist: {
    paths: ["tasks"], // solo persiste tasks, no loading
  },
});
