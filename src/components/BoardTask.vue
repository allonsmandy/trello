<template>
  <div @click="goToTask(task)">
    <AppDrop @drop="moveTaskOrColumn">
      <AppDrag class="task" :transferData="{ type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex }">
        <strong class="task__title">
          {{ task.name }}
        </strong>
        <p v-if="task.description" class="task__description">
          {{ task.description }}
        </p>
      </AppDrag>
    </AppDrop>
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
}
</style>
