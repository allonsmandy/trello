import Vue from 'vue';
import Vuex from 'vuex';
import { saveStatePlugin, uuid } from '../utils';

Vue.use(Vuex);

const defaultBoard = {
  name: 'trello',
  columns: [],
};

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
      // Vue.set(task, key, value)
    },
    UPDATE_COLUMN(state, { column, key, value }) {
      column[key] = value;
    },
    MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskPositionIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0];
      toTasks.splice(toTaskPositionIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0];
      columnList.splice(toColumnIndex, 0, columnToMove);
    },
    DELETE_TASK(state, { deleteTask, columnIndex }) {
      const id = state.board.columns[columnIndex].tasks.map((task) => task.id).indexOf(deleteTask.id);
      state.board.columns[columnIndex].tasks.splice(id, 1);
    },
    DELETE_COLUMN(state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1);
    },
  },
  actions: {},
  modules: {},
});
