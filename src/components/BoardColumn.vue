<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag class="column" :transferData="{ type: 'column', fromColumnIndex: columnIndex }">
      <div class="column__wrapper">
        <textarea
          :value="column.name"
          class="column__title"
          @change="updateColumnName($event, 'name')"
          @keyup.enter="updateColumnName($event, 'name')"
        />
        <button class="column__delete" @click.prevent="deleteColumn(columnIndex)">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-trash"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>

      <BoardTask
        v-for="(task, taskIndex) of column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <input type="text" placeholder="+ Enter new task" @keyup.enter="createTask($event, column.tasks)" />
    </AppDrag>
  </AppDrop>
</template>

<script>
import BoardTask from '@/components/BoardTask';
import AppDrag from './AppDrag';
import AppDrop from './AppDrop';
import dragDrop from '@/mixins/drag-drop';

export default {
  components: {
    BoardTask,
    AppDrag,
    AppDrop,
  },
  mixins: [dragDrop],
  methods: {
    pickupColumn(event, fromColumnIndex) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';

      event.dataTransfer.setData('from-column-index', fromColumnIndex);
      event.dataTransfer.setData('type', 'column');
    },

    updateColumnName(event, key) {
      this.$store.commit('UPDATE_COLUMN', {
        column: this.column,
        key,
        value: event.target.value,
      });
    },

    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value,
      });
      event.target.value = '';
    },

    deleteColumn(columnIndex) {
      this.$store.commit('DELETE_COLUMN', {
        columnIndex,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.column {
  background-color: $light;
  border: 3px solid $dark;
  border-radius: 5px;
  max-height: 90vh;
  margin: 10px;
  min-width: 350px;
  overflow: auto;
  padding: 15px;
  width: 350px;

  &__wrapper {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
  }

  &__title {
    border-bottom: 1px solid lighten($dark, 15%);
    color: $purple;
    font-size: 16px;
    letter-spacing: 2px;
    text-align: center;
    text-transform: uppercase;
  }

  &__delete {
    background: none;
    border: none;
    color: darken($primary, 40%);
    cursor: pointer;
    margin-top: 3px;

    &:hover {
      color: darken($primary, 80%);
    }

    &:focus {
      outline: none;
    }
  }

  textarea,
  input {
    background-color: $light;
    border: none;
    width: 100%;

    &:hover,
    &:focus {
      outline: none;
    }
  }
}
</style>
