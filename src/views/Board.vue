<template>
  <div class="board">
    <div class="board__wrapper">
      <BoardColumn
        v-for="(column, columnIndex) of board.columns"
        :key="columnIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <div class="board__newColumn">
        <input type="text" v-model="newColumnName" placeholder="+ Enter new column" @keyup.enter="createColumn" />
      </div>
    </div>

    <div class="task" v-if="isTaskOpen">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BoardColumn from '@/components/BoardColumn';

export default {
  components: {
    BoardColumn,
  },
  data() {
    return {
      newColumnName: '',
    };
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task';
    },
  },
  methods: {
    createColumn() {
      if (this.newColumnName) {
        this.$store.commit('CREATE_COLUMN', {
          name: this.newColumnName,
        });

        this.newColumnName = '';
      }
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

  &__newColumn input {
    background-color: $default;
    border: none;
    margin-top: 10px;

    &:hover,
    &:focus {
      outline: none;
    }
  }
}
</style>
