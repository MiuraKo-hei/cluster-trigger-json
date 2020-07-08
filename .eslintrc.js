module.exports = {
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/ban-ts-comment": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
    "import/prefer-default-export": 0,
    "import/extensions": [
      2,
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": 0,
  },
};
