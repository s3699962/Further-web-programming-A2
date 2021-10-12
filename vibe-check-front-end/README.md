This app is created by Jeanette Roga, s3699962 as part of COSC2758 Further Web Programming.

In this project I have :
- used icons from Font Awesome (https://fontawesome.com/)
- fonts from Google Fonts (https://fonts.google.com/)
- Images from Unsplash (https://unsplash.com/)

#Design choices
Components have been separated depending on their functions and common code has been pulled out and implemented in a way that will make it reusable. E.g. buttons and utility functions.

Additionally, repeated sections of code have been extracted into separate components and passed props that are needed. This is so that main components are kept light and don't have repeated blocks of code. This also makes the code re-useable when there are common components that are implemented in different components. An example is the common input section used in the login, sign up and edit forms. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
