<template>
  <div class="board">
    <div class="board__wrapper">
      <div class="board__column" v-for="(column, index) of board.columns" :key="index">
        <strong class="board__column__title"> {{ column.name }} </strong>
        <div class="board__task" v-for="(task, index) of column.tasks" :key="index">
          <strong class="board__task__title">
            {{ task.name }}
          </strong>
          <p v-if="task.description" class="board__task__description">
            {{ task.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['board']),
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
  }

  &__task {
    background-color: pink;
    border-radius: 5px;
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
