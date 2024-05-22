import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  projectId: "vtfv8p",
  e2e: {
    env: {
      isMobile: false,
    },
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      allureCypress(on)
    },
  },
});
