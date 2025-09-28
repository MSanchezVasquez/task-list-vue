# 📋 Pinia Tasks

Aplicación de lista de tareas construida con **Vue 3**, **Vite** y **Pinia**.  
Permite crear, marcar como favoritas, completar y eliminar tareas, además de persistirlas en un backend con **JSON Server** desplegado en Render.

---

## 🚀 Tecnologías usadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (gestión de estado)
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/)
- [JSON Server](https://github.com/typicode/json-server) (backend REST fake)
- Deploy: [Netlify](https://www.netlify.com/) + [Render](https://render.com/) (para el backend)

---

## 📂 Estructura principal del proyecto

```

task-list/
├── src/
│   ├── App.vue              # Vista principal
│   ├── components/
│   │   ├── TaskForm.vue     # Formulario para añadir tareas
│   │   ├── TaskDetails.vue  # Componente para mostrar cada tarea
│   ├── stores/
│   │   └── taskStore.js     # Pinia store para manejar tareas
│   └── main.js              # Punto de entrada Vue
├── public/
│   └── _redirects           # Reglas para SPA en Netlify
├── package.json
├── netlify.toml             # Configuración de despliegue en Netlify
└── README.md

```

---

## ⚙️ Instalación y ejecución local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/usuario/task-list.git
   cd task-list
   ```

2. Instala dependencias (puedes usar `pnpm`, `npm` o `yarn`):

   ```bash
   pnpm install
   ```

3. Corre el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

4. Abre en el navegador:

   ```
   http://localhost:5173
   ```

---

## 🛠️ Scripts disponibles

- `pnpm dev` → Levanta el entorno de desarrollo.
- `pnpm build` → Compila para producción.
- `pnpm preview` → Sirve la build en local para pruebas.

---

## 🌐 Backend (JSON Server en Render)

La store (`taskStore.js`) consume la API en:

```
https://json-server-backend-wgym.onrender.com/tasks
```

Endpoints disponibles:

- `GET /tasks` → Obtener todas las tareas
- `POST /tasks` → Crear tarea
- `DELETE /tasks/:id` → Eliminar tarea
- `PATCH /tasks/:id` → Actualizar estado (favorita o completada)

---

## ✨ Mejoras futuras

- Autenticación de usuario
- Categorías de tareas
- Dark mode
- Test unitarios con Vitest

---

## 👨‍💻 Autor

Proyecto desarrollado por **Moises Sanchez**.
