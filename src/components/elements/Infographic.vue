<template>
  <div class="modal-backdrop">
    <div class="modal w-1/4">
      <header class="modal-header">
        <slot name="header"> {{ topic }} </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>

      <section class="modal-body">
        <slot name="body"> {{ message }} </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"> </slot>
        <button
          type="button"
          class="btn-back items-center mx-auto"
          @click="close"
        >
          <img
            :src="back_icon"
            alt="back_icon"
            class="object-cover items-center justify-center mx-auto"
          />
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import back_icon from "@/assets/icons/back_icon.svg";

export default {
  name: "MyInfographic",
  props: {
    topic: String,
    message: String,
  },
  data() {
    return {
      back_icon: back_icon,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  border-radius: 10px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #20a4f3;
  font-weight: bold;
  justify-content: center;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #20a4f3;
  background: transparent;
}

.btn-back {
  color: #20a4f3;
  background: white;
  border: 1px solid white;
  border-radius: 2px;
  align-items: center;
}
</style>
