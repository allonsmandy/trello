<template>
  <div class="board">
    <div class="board__wrapper">
      <div class="board__column" v-for="(column, index) of board.columns" :key="index">
        <strong class="board__column__title"> {{ column.name }} </strong>
        <div class="board__task" v-for="(task, index) of column.tasks" :key="index" @click="goToTask(task)">
          <strong class="board__task__title">
            {{ task.name }}
          </strong>
          <p v-if="task.description" class="board__task__description">
            {{ task.description }}
          </p>
        </div>

        <input type="text" placeholder="+ Enter new task" @keyup.enter="createTask($event, column.tasks)" />
      </div>
    </div>

    <div class="task" v-if="isTaskOpen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task';
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } });
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
.board {
  background-color: $default;
  bottom: 0px;
  height: 100vh;
  left: 0px;
  overflow: scroll;
  position: fixed;
  right: 0px;
  top: 0px;

  &__wrapper {
    display: flex;
  }

  &__column {
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

  &__task {
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
}
</style>
