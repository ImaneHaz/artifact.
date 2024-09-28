import { createRequire } from 'module'; 
const require = createRequire(import.meta.url); 

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.js', '**/*.jsx'], 
    languageOptions: {
      globals: {
        ...globals.browser, 
        require: true, 
        process: true, 
        __dirname: true, 
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', 
      'react/jsx-uses-react': 'off', 
    },
  },
  {
    files: ['server.js'], 
    plugins: {
      javascript: pluginJs,
    },
    ...pluginJs.configs.recommended,
  },
];
