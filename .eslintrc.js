const sharedRules = {
  "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
  'class-methods-use-this': ['off']
};

const sharedTypeScriptRules = {
  "@typescript-eslint/no-explicit-any": ["off"]
};

const sharedSettings = {
  "import/resolver": {
    "babel-module": {
      "root": ["."],
      "extensions": [".js", ".jsx", ".ts", ".tsx"]
    },
    "node": {
      "extensions": [".js", ".jsx", ".ts", ".tsx"]
    }
  }
};

module.exports =  {
  extends:  [
    'eslint-config-airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions:  {
    ecmaVersion:  2020,
    sourceType:  'module',
  },
  settings: sharedSettings,
  rules: {
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": ["build/**/*.js", "rollup.config.js"]
      }
    ],
    ...sharedRules
  },
  overrides: [
    {
      files: ["*.ts"],
      parser:  '@typescript-eslint/parser',
      extends:  [
        'eslint-config-airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      settings: sharedSettings,
      rules: {
        "import/no-extraneous-dependencies": [
          "error", {
            "devDependencies": ["build/**/*.ts"]
          }
        ],
        ...sharedRules,
        ...sharedTypeScriptRules
      },
    },
    {
      files: ["*.test.ts"],
      plugins: ["jest"],
      parser:  '@typescript-eslint/parser',
      extends:  [
        'eslint-config-airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        "plugin:jest/recommended",
        "plugin:jest/style"
      ],
      env: {
        "jest/globals": true
      },
      settings: sharedSettings,
      rules: {
        "import/no-extraneous-dependencies": [
          "error", {
            "devDependencies": ["**/*.test.ts"]
          }
        ],
        ...sharedRules,
        ...sharedTypeScriptRules
      },
    }
  ]
};
