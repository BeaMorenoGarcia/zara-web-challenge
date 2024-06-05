# The application

The application shows a list of characters from Marvel's universe. You can add each one to your favourite list and then see your favourite's list.

You can search characters with the start name.

If you click on a character photo, you can see the description and 20 comics maximum where appears.

##  How to run the application

In the project directory, you can run:

### .env file

You need to add a `.env` file in the root folder project with the following variables:

`REACT_APP_PRIVATE_KEY`= private key for your user from marvel api

`REACT_APP_PUBLIC_KEY`= public key for your user from marvel api

`REACT_APP_TIMESTAMP`= timestamp value

### npm start

Runs the app in the development mode

### npm test

Launches the test runner in the interactive watch mode.

### npm run build

Builds the app for production to the `build` folder.

The build is minified and the filenames include the hashes.

## How to open the application in development mode

After lunch `npm start`, your browser will be opened with the url `http://localhost:3000/`

### Navigates inside the application

The application have two view, that share the header On left side, you have a header with the Marvel's logo, that redirects you to the List view to see all the characters. On right side, you have a heart icon that shows the number of characters you have add to your list and, by clicking it, redirect to List view filtering results by your favourites.

#### List view

You can see the list of Marvel's characters with the name, the photo and and heart icon that shows if it is added at your favourites list or not and allow you to do it clicking on it. If you click on the character´s image, you will be redirected to the Detail view. When you scroll to the top, application reload autamically 50 more results and add it to the results.

You can filter the results by the name it starts with.

#### Detail view

You can see the complete detail of the character selected in the List view. On the right, it is a heart icon that shows if it is added at your favourites list or not and allow you to do it clicking on it.
Under that, you can see a carrousel with the first 20 comics where the character appears.