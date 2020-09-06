<template>
  <div class="task-view">
    <div class="task-view__content">
      {{ task.name }}

      <span class="task-view__close" @click="close">x</span>
    </div>
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
  }

  &__close {
    cursor: pointer;
    float: right;
  }
}
</style>
