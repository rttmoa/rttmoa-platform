module.exports = {
	'*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
	'*.{json,code-snippets}': ['prettier --write --parser json'],
	'*.{scss,less,styl,html}': ['stylelint --fix --allow-empty-input', 'prettier --write '],
	'*.md': ['prettier --write'],
};
