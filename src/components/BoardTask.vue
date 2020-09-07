<template>
  <div class="task">
    <div @click="goToTask(task)">
      <AppDrop @drop="moveTaskOrColumn">
        <AppDrag :transferData="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }">
          <strong class="task__title">
            {{ task.name }}
          </strong>
          <p v-if="task.description" class="task__description">
            {{ task.description }}
          </p>
        </AppDrag>
      </AppDrop>
    </div>
    <button class="task__delete" @click.prevent="deleteTask(task, columnIndex)">
      Delete
    </button>
  </div>
</template>

<script>
import dragDrop from '@/mixins/drag-drop';
import AppDrag from './AppDrag';
import AppDrop from './AppDrop';

export default {
  components: {
    AppDrag,
    AppDrop,
  },
  mixins: [dragDrop],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } });
    },
    deleteTask(deleteTask, columnIndex) {
      this.$store.commit('DELETE_TASK', {
        deleteTask,
        columnIndex,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.task {
  background-color: $primary;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 6px;
  padding: 6px;

  &__description {
    font-size: 14px;
    overflow: hidden;
    padding: 3px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__title {
    font-weight: 500;
  }

  &__delete {
    background: none;
    border: none;
    color: darken($primary, 20%);
    cursor: pointer;
    font-size: 10px;
    letter-spacing: 2px;
    text-decoration: underline;

    &:focus {
      outline: none;
    }

    &:hover {
      color: darken($primary, 30%);
    }
  }
}
</style>
