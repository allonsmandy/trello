<template>
  <div class="task-view">
    <div class="task-view__content">
      <input type="text" :value="task.name" @change="updateTaskProperty($event, 'name')" />
      <textarea
        :class="{ 'empty-description': !task.description }"
        :value="task.description || 'Write a description...'"
        @change="updateTaskProperty($event, 'description')"
      />
    </div>
    <span class="task-view__close" @click="close">x</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getTask']),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' });
    },
    updateTaskProperty(event, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: event.target.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task-view {
  align-items: center;
  background-color: #80808047;
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;

  &__content {
    background-color: white;
    border-radius: 4px;
    padding: 1rem;
    width: 60%;

    input,
    textarea {
      display: block;
      width: 100%;
      border: none;

      &:hover,
      &:focus {
        outline: none;
      }
    }

    input {
      font-size: 16px;
      font-weight: 600;
    }

    textarea {
      padding: 10px 0px;
    }
  }

  &__close {
    border-radius: 50%;
    padding: 6px 12px;
    background: white;
    cursor: pointer;
    position: relative;
    bottom: 40px;
    right: 25px;
    float: right;
    border: 2px solid black;
  }

  .empty-description {
    color: lighten(black, 60%);
  }
}
</style>
