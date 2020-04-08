<template>
  <div>
    <div class="modal show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete Board?</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>All data tied to this board will be deleted. Continue?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="close"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    open: { type: Boolean, default: false }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style>
.show {
  display: block;
}
</style>