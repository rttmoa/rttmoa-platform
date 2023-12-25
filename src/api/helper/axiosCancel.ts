// ? Not used yet, currently use global Loading to control repeated requests
import { CustomAxiosRequestConfig } from "../index";
import qs from "qs";

// Declare a Map to store the identity and cancel function for each request
let pendingMap = new Map<string, AbortController>();

// Serialization parameters
export const getPendingUrl = (config: CustomAxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
  /**
   * @description: Add request
   * @param {Object} config
   * @return void
   */
  addPending(config: CustomAxiosRequestConfig) {
    // Before the request starts, check the previous request to cancel the operation
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  /**
   * @description: Removal request
   * @param {Object} config
   */
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config);
    // If there is a current request ID in pending, the current request needs to be canceled
    const controller = pendingMap.get(url);
    controller && controller.abort();
  }

  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach(controller => {
      controller && controller.abort();
    });
    pendingMap.clear();
  }
}
