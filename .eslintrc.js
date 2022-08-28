module.exports = {
    root: true,
    parser: "@javascript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    env: { browser: true, es2021: true, jest: true },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@javascript-eslint/recommended",
      "prettier",
    ],
    plugins: [
      "react",
      "@javascript-eslint",
      "simple-import-sort",
      "import",
      "prettier",
    ],
    rules: {
      "prettier/prettier": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "react/react-in-jsx-scope": "off",
    },
    
  };