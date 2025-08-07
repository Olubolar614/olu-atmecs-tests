module.exports = {
  default: {
    timeout: 60000, // Global timeout in milliseconds
    require: [
      'src/step-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
    resultsDir: "allure-results",
  },
    publishQuiet: true
  }
};