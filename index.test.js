const Cyberoam = require(".");
const defaults = require("./defaults.json");

test("checks if options are set to defaults correctly", () => {
  const cyberoam = new Cyberoam();

  expect(cyberoam.options).toEqual(defaults);
});

test("checks if defaults are overriden properly", () => {
  const newOpts = {
    loginURL: "A",
    liveURL: "B",
    loginMessage: "C",
    logoutMessage: "D",
    commonOptions: { alpha: "beta" },
  };
  const cyberoam = new Cyberoam(newOpts);

  expect(cyberoam.options).toEqual(newOpts);
});

test("checks if defaults are left unchanged when no alternative is provided", () => {
  const newOpts = {
    loginURL: "A",
  };
  const cyberoam = new Cyberoam(newOpts);

  const { loginURL: a, ...toBeChecked } = cyberoam.options;
  const { loginURL: b, ...newDefaults } = defaults;

  expect(toBeChecked).toEqual(newDefaults);
});
