<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <label for="new-task-input" class="sr-only">
      Escribe una nueva tarea
    </label>
    <input
      id="new-task-input"
      type="text"
      placeholder="Ej: Comprar comida para el gato..."
      v-model.trim="newTask"
      :class="{ 'input-error': hasError }"
      :aria-invalid="hasError"
      aria-describedby="task-error-msg"
      @input="clearError"
    />
    <button :disabled="!newTask">Add</button>
    <div class="error-container">
      <transition name="fade">
        <p v-if="hasError" id="task-error-msg" class="error-msg" role="alert">
          <span aria-hidden="true">⚠️</span>
          La tarea debe tener al menos 3 caracteres.
        </p>
      </transition>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/taskStore";

const taskStore = useTaskStore();

const newTask = ref("");
const hasError = ref(false);

// Micro-optimización: Feedback inmediato
const clearError = () => {
  if (hasError.value) hasError.value = false;
};

const handleSubmit = () => {
  if (newTask.value.length < 3) {
    hasError.value = true;
    return;
  }
  hasError.value = false;

  taskStore.addTask({
    title: newTask.value,
    isFav: false, // Es buena práctica inicializar todas las propiedades
    id: crypto.randomUUID(), // <--- RECOMENDACIÓN NATIVA
  });

  newTask.value = "";
  hasError.value = false;
};
</script>

<style scoped>
/* Contenedor para evitar que el formulario "baile" cuando aparece el error */
.task-form {
  position: relative;
  /* Ajustamos el grid original para considerar el mensaje de error */
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
  align-items: start; /* Alineación superior */
}

.error-container {
  grid-column: 1 / -1; /* Ocupa todo el ancho */
  min-height: 24px; /* Reserva espacio */
}

.error-msg {
  color: #ff4d4f;
  font-size: 0.85em;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Transición suave para el error */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
