# Ping Pong Pair Picker
A ping pong tournament tracker, designed and built by Nicola Richardson.

## Setting the app up
* Download the project files and unzip the folder.
* Open the index.html file in your browser.
* Easy peasy! 

Or view the live version here: [nicola.developme.training](nicola.developme.training)

## About the app
Ping Pong Pair Picker was created in response to a technical challenge set as the final project on Develop Me Training's [12-week full-stack coding Fellowship](https://developme.training/fellowship/). 

### The brief
>Create a tool which randomly creates pairings for a table tennis tournament from a list of names collected from the user.

>It's up to you how you implement this, with JavaScript, React, or PHP, as a web page, or as an app.

>Optional advanced features might include:
>* The ability to record scores for each player, or mark which player won from each pairing, to create the next round of the tournament playoffs
>* Continued rounds until the final (last 2 players who have won all matches to date play each other).

## The build
### Technologies
This app was built using HTML5, CSS, Sass, JavaScript and jQuery.

### Aims
The aim was to deliver a mobile-first response to the brief which focussed on clean and readable code, accessibility and UX.

### Key development reflections
JavaScript and jQuery were chosen as the main programming languages as an additional challenge. My knowledge of both was very basic at the start of the build but, by forcing myself out of my comfort zone, my skills and abilities have dramatically increased. Particular efforts were made to keep the script readable by using functions and arguments to their full potential, with significant refactoring being undertaken to achieve this goal.

The app was styled without the help of a framework. This decision was made in order to get a firmer handle on styling techniques. I chose to use Sass to help organise the stylesheets in order to avoid having one large CSS file. Seeing as I was using consistent styles across the app, being able to use variables and mixins seemed the logical choice. The final CSS file was served with a browser reset code included. This was to reduce the load time by loading in two files rather than one.

Handling the state of the app was a challenge. In an effort to reduce the amount of global variables used, and to help with readability throughout the script, I added the state variables to a `state` object stored in an `init()` function. This allowed for state references to be easily differentiated from references to local variables.