<template>
  <div class="task-view">
    <div class="task-view__content">
      <input
        type="text"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />
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
  background-color: #363950b0;
  bottom: 0;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10;

  &__content {
    background-color: $dark;
    border-radius: 5px;
    padding: 3px;
    width: 60%;

    input,
    textarea {
      border: none;
      display: block;
      padding: 0.6rem 1rem;
      width: 100%;

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
      height: 400px;
    }
  }

  &__close {
    background: lighten($default, 10%);
    border: 2px solid $dark;
    border-radius: 50%;
    bottom: 215px;
    font-size: 12px;
    float: right;
    cursor: pointer;
    padding: 4px 9px;
    position: relative;
    right: 18px;
  }

  .empty-description {
    color: lighten($dark, 60%);
  }
}
</style>
