
# Prello-front

Prello's application front-end (a Trello-like application).

[![CircleCI](https://circleci.com/gh/awi2017-option1group1/Prello-front/tree/master.svg?style=svg)](https://circleci.com/gh/awi2017-option1group1/Prello-front/tree/master)

- - - - - - - - -

## Requirements

- `Node >= 8`
- `Npm >= 5`
- UNIX systems (Linux or iOS) are preferred

- - - - - - - - -

## Installation

-  Clone the github repository. 
-  git clone 

`https://github.com/awi2017-option1group1/Prello-front`


-  Install the dependencies for development mode

    `npm install`

## Execution

- Source the `.env.dev` file

    `source .env.dev`
- To run the application in development mode (need the back-end up and running) 

    `npm run start:dev`

- To run the application in production mode (need the back-end up and running) 

	`npm run build && npm start`

- To run the tests

	`npm test`

You should be able to see `localhost:3000` (if you have not change the port).
See nginx installation part to finish the setup.

- - - - - - - - -

## Dependencies

- Prello front end application is written in `Typescript`.  
- It is built with the React ecosystem: `React`, `Redux`, `React-Router`, `React-Dom`, `Redux-thunk`.  
- To handle the packaging of the application we use `Webpack`.  
- To test the application we use `Jest` enhanced with `Enzyme`.
- The look and feel is provided by `semantic-react`.

- - - - - - - - -

## Contributing

Please follow the Google Angular guidelines: 
[Guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)



