<h1 align="center">TFF-supported Merchandise Store For All Turkish Football Clubs</h1>

## https://cs308group39.web.app/

## Description of the project
A web app which enables the teams to display their products for sale and enables customers to buy products.

#### Problem: 
Most teams in TFF’s lower divisions do not have stores and websites where they sell their merchandises.

For this reason, the fans have difficulty in reaching the merchandise of their team and clubs are not earning as much revenue as they potentially could from merchandise sales.
#### Solution:
A web app in which all clubs affiliated with TFF can sell their merchandise under one roof.

## How to use the website:

#### Customer:
Anyone can go to the website url and view the products or search them. To buy or comment on products, the user has to be logged-in. In order to be logged-in, the user can simply use the Login or Signup buttons depending on user having an account or not. After signing in, the user is able to add the products to the card and continue with puchasing.

#### Team:
A team has to change their account type with a secret security key that is provided by site administrators.
After that the team will be able to add or delete products of their team.

## Features:
- Add/delete products
- Comment on products
- Signup/Signin/Signout
- Update profile info
- Search products
- Add/delete/change addresses
- Shopping card
- Order products
- Like products
- View team specific products
- Filter products
#### In progress:
- Yet to be decided


## Directory Structure:
- ##### `.firebase` - Has the cache files created in deployments.
- ##### `.build` - Has files that are the compiled and ready to be hosted.
- ##### `.public` - Has the static files.
- ##### `src`
    - ##### `components` - Has files of jsx returning component to be used in the app.
    - ##### `Context` - Has code for the authantication context provider.
    - ##### `firebase` - Has the firebase database comminicator and configuration.
    - ##### `hooks` - Contains codes that are used in pages or components.
    - ##### `pages` - Contains all the codes that return pages.
    - ##### `App.js` - The main wrapper function of the web application.
    - ##### `index.css` - The CSS code that is applicable to everypage in the app.
    - ##### `index.js` - The code for rendering App.js.
- ##### `.firebaserc` - Has the firebase project name for database.
- ##### `firebase.json` - Specifies the deploy configuration.
- ##### `.gitignore` - Ignored files by git.
- ##### `package.json` - Specifies dependencies and versions and specifcations for the project.
- ##### `package-lock.json` - Compiled version of `package.json`.
- ##### `README.md` - This file you are reading.

## Deployment:

In order to deploy the web app, clone the main repository and run `npm install --force` in the same directory with the terminal.

To deploy on localhost use `npm start`

To deploy to firebase use `npm run build` and `firebase deploy`


## Bug Reporting:
To report a bug simply write a well described email about the problem to eighter `rlider@sabanciunv.edu` or `bartudogan@sabanciuniv.edu` or `shah@sabanciuniv.edu`.
Please provide screenshots about the problem for faster discovery of the problem.
