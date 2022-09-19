# The One Thing
My application for a job @ Qberon.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project used Google Material UI, MobX, ColorPicker and Giphy API.
Chime sound from: [https://pixabay.com/sound-effects/search/chime/](https://pixabay.com/sound-effects/search/chime/).



The app has 3 main components:

### Focus questions

The user can set the first and the second part of their focus question.
If the program finds the question saved in `localStorage` it will be loaded automatically.
If editing is done, the values are saved in the `localStorage`.


### Pomodoro timer

The user can set the durantion of the working and resting times.
If the program finds the minutes details saved in `localStorage` it will be loaded automatically.
If editing is done, the values are saved in the `localStorage`.
On every third Pomodoro cycles the resting time is the longer resting time.
After setting the values, the timer can be started and paused with the button in the middle.
The current state of the timer is saved in the `localStorage` including the seconds passed.
If the timer is running a related random gif appears.

### Settings

Settings can be accessed by clicking on the cog icon in the top right corner.
A dialog will popup where you can set the theme color and the font.
These settings are stored in the `localStorage`.



## Available Scripts

In the project directory, you can run:

### `npm start`

Before runnung the command for the first time, run `npm install` first to install depencies.

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
