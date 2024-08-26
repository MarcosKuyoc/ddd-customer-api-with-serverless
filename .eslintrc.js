module.exports = {
  parser: '@typescript-eslint/parser', // Usa el parser de TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Permite el uso de características modernas de ECMAScript
    sourceType: 'module', // Soporta módulos ES
    project: './tsconfig.json', // Apunta al archivo tsconfig.json
  },
  extends: [
    'eslint:recommended', // Reglas recomendadas de ESLint
    'plugin:@typescript-eslint/recommended', // Reglas recomendadas para TypeScript
    'plugin:prettier/recommended', // Integra Prettier con ESLint
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Lanza errores si el código no sigue las reglas de Prettier
    '@typescript-eslint/explicit-function-return-type': 'off', // Desactiva la regla de tipo de retorno explícito
    '@typescript-eslint/no-unused-vars': ['warn'], // Muestra advertencias para variables no usadas
    'indent': ['error', 2], // Requiere indentación de 2 espacios
    'quotes': ['error', 'single'], // Usa comillas simples
    'semi': ['error', 'always'], // Requiere punto y coma
    'no-console': ['warn'], // Muestra advertencias para el uso de `console`
  },
};
