# General App Info

Northcoders News is a social news aggregation, web content rating, and discussion website.

Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

This app serves as the 'view' element of the MVC, which displays data and handles user interaction. It renders, to the user, all the back-end information from the database about Northcoder news (Articles, Comments, Topics, Articles Vote, Articles Vote etc).

The front-end has been built on ReactJS, with styling done with React-Bootstrap. Routing has been completed with Reach-router.

The back-end of the app was done in ExpressJS; Database in PostgreSql, while the seeding was done with KnexJS.

## Instructions

To run this app locally, you will need to clone the repository from GitHub to your local machine. Follow the instructions below:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Links to the Repo

Front-end: https://github.com/kenigreg/gregs_NcNews.git;<br>
Back-end: https://github.com/kenigreg/NC_News;<br>
API: <br>

## Deployment

The NC News Front End was deployed with Netlify
