<template>
  <div class="d-flex align-items-center" :class="{inline: 'inline', left: 'flex-row-reverse'}">
    <img
      :src="user.picture"
      :height="height"
      :width="height"
      :class="{rounded, 'rounded-circle': circle}"
    />
    <small class="mx-2" v-if="showName" v-text="user.name"></small>
  </div>
</template>

<script>
export default {
  name: "user-avatar",
  props: {
    user: { type: Object, required: true },
    height: { type: [String, Number], default: 45 },
    showName: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    left: { type: Boolean, default: false },
    inline: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
img {
  object-fit: cover;
  object-position: top center;
}

.inline {
  display: inline;
}
</style>