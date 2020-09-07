<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag class="column" :transferData="{ type: 'column', fromColumnIndex: columnIndex }">
      <strong class="column__title"> {{ column.name }} </strong>

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

    createTask(event, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: event.target.value,
      });
      event.target.value = '';
    },
  },
};
</script>

<style scoped lang="scss">
.column {
  background-color: $light;
  border: 3px solid $dark;
  border-radius: 5px;
  margin: 10px;
  min-width: 350px;
  padding: 15px;
  width: 350px;

  &__title {
    border-bottom: 1px solid lighten($dark, 15%);
    color: $primary;
    display: block;
    font-family: sans-serif;
    letter-spacing: 2px;
    padding-bottom: 5px;
    text-align: center;
    text-transform: uppercase;
  }

  input {
    background-color: $light;
    border: none;
    padding: 6px;
    width: 100%;

    &:hover,
    &:focus {
      outline: none;
    }
  }
}
</style>
