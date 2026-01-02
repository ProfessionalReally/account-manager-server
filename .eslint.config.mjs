import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default tseslint.config([
	globalIgnores(['dist', 'node_modules']),
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			perfectionist.configs['recommended-natural'],
			eslintConfigPrettier,
		],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				project: ['./tsconfig.json'],
				allowDefaultProject: true,
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: ['./tsconfig.json'],
				},
			},
		},
	},
]);
