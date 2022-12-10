/*
----------------- Steps to Use Firebase -----------------
* 1. Create a project on console.firebase.google.com
* 2. npm i firebase
* 3. Register Web App in Firebase
* 4. In "firebase.init.js" file, copy firebase init config from firebase project settings
* 5. export default app from "firebase.init.js" file
* 6. import app from "firebase.init.js" to our "App.js"
* 7. import {getAuth} from "firebase/auth" & create const auth = getAuth(app) in "App.js" OUTSIDE the functional component of App.js
* 8. ****** Go to Console & then authentication and Turn On Google Authentication & enable google sign in ******
* 9. Create Google Provider
* 10. ****** use signInWithPopup and pass auth & provider ******
* 11. handle .then if success & .error if failure
*/

/* 
GitHub Authentication
https://docs.google.com/document/d/120vGcXmRSZID1D2V1U-NP8bF79aSxGr1dJ7y4xmBZXQ/edit

- Console Firebase -> Authentication -> Add New Provider
- Github Homepage -> Settings -> Application -> OAuth App
- Authorization Callback URL Firebase Console theke copy krte hbe

*/


/* Recap Steps (Nijer vashay)
1. project create krbo
2. npm i firebase
3. Firebase a Web App register krbo
4. Console -> Our Project -> Settings -> Project settings, a jabo, giye nicher dke scroll krbo; kore initializeFirebase er jinish gulo copy kore "firebase.init.js" a nibo
5. export default app from "firebase.init.js" file
6. amdr "App.js" file a, import app from "firebase.init.js"
7. amdr "App.js" file a, import {getAuth} from "firebase/auth" & create auth = getAuth(app)

*/