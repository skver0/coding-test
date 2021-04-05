## Setting up the project

1. Execute the following commands in your terminal:

```
git clone https://github.com/skver0/coding-test
cd coding-test
npm install
```

2. [Create a GitHub access token](https://github.com/settings/tokens/new) with access to public repositories. [(Guide)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
3. In `./src/index.jsx`, replace `GITHUB_AUTH_TOKEN` with the generated token.

## Commands

### `npm run start`

Builds an unoptimized development version and runs the dev server.\
Go to [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will automatically reload if you make any changes.

### `npm run build`

Builds the app in optimized production mode.\
The resulting JavaScript and CSS bundles will be placed in the `./public` folder.\

Use a static file server like [sirv](https://www.npmjs.com/package/sirv) to serve the production build.

## Frameworks/libraries used

- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org/), [urql](https://formidable.com/open-source/urql/)
- [PostCSS](https://postcss.org/)
  - [autoprefixer](https://github.com/postcss/autoprefixer)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [cssnano](https://cssnano.co/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
