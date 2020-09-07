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
  background-color: pink;
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

  &__delete {
    background: none;
    border: none;
    cursor: pointer;
    float: right;
    position: relative;
    bottom: 17px;

    &:focus {
      outline: none;
    }

    svg {
      fill: red;

      &:hover {
        fill: lighten(red, 50%);
      }
    }
  }
}
</style>
