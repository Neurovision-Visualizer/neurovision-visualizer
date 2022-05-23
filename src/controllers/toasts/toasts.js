import { createToast } from "mosha-vue-toastify";

// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

export function dangerNotification(message) {
  createToast(message, {
    type: "danger",
    transition: "zoom",
    position: "top-center",
  });
}

export function successNotification(message) {
  createToast(message, {
    type: "success",
    transition: "zoom",
    position: "top-center",
  });
}
