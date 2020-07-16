# QUIZ-SERVER-NODE explained
Back-end server develeoped with nodeJS and express framework. <br/>
Exposing REST APIs to manage a mongoDB database.

### Basic stucture
- __package.json__, configuration file containing information about the project, e.g. name, dependencies, run and dev starting script referencies, versions. (Simply run 'npm install' within this folder to automatically install all dependencies)

- __index.js__, main file in which express application server is initialized.

- __routes/__, folder defining API routes. Sub-folders define the API tree exposed to the network while js files contain HTTP calls custom behaviour.

- __mongoose/__, folder containing classes to manage MongoDB database.

- __auth/__, folder containing classes to manage authorization and authentication strategies.

- __*node_modules/*__, will compare only running "npm install" and contain all project dependencies.