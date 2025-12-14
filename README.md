# SmartBrain
Smartbrain is a face recognition app, you enter a JPEG,PNG image link, hit detect, and the image appear with highlight boxes on all detected faces in the photo, the app also features account creation and sign in features, and to make it fun, the more you use the app the higher your score will be.
This project was the final project as part of ZTM academy's [Complete Web Developer](https://zerotomastery.io/courses/coding-bootcamp/) course by [Andrei Neagoie](https://zerotomastery.io/about/instructor/andrei-neagoie/), you should check it out !

## Technologies and libraries
The app is made of 4 main parts, 
- a user interface built with **React.js** , **Tailwindcss** for styling, **react-tilt** for the interactive logo, **tsparticles** for background particles. (this repo)
- a server built with **Express.js** that uses **Knex** to conntect to the database ([here](https://github.com/MRWOLVEY/SmartBrainBE))
- a **PostgreSQL** database
- a face detection model built with google's **mediapipe** ([here](https://github.com/MRWOLVEY/FaceDet))
## Demo
Check out the app [here](https://mohammed-morra-smartbrain.netlify.app/login)
