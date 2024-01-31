# Color Carnival Homework

## Technologies used

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [React (Vite)](https://vitejs.dev/)
- [MaterialUI](https://mui.com/material-ui/)

To fire up the project: copy `.env.example` to `.env` and set it with corresponding values. You need to create a MongoDB database to proceed as well as Node.js.

Putting these lines into each folder (`/api`, `/client`) into `/.vscode` folder and `settings.json` file will help with ESLint and Prettier:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": ["source.sortMembers", "source.formatDocument", "source.fixAll.eslint"]
}
```

P.S. I spent around 3-4 days (4-5 hours per day) on this project. Refreshing some React knowledge and reading frameworks docs took most of the time. This project does not tend to be used for production purposes. However, there is always room for improvement.

## Overview

You are making a game with a React frontend for the game and a NodeJS backend for the API. Instructions are specific when they need to be, but are also left intentionally vague in areas so that you may choose what's comfortable to you. The frontend and backend are separate Node applications.

## API

Develop NodeJS applications with the following requirements:

1. All coding work must be done in this repository.
2. Homepage page (`/`) that has a login for a username and password. The login check can just be a simple check against a variable on the server. For the frontend, I recommend using `localStorage` or a cookie to fake logins once the request comes back to the server that username and password is valid.
3. Game page (`/game`) that requires a login. If the user isn't logged in, they're simply redirected to the homepage.
4. API route(s) to handle the game. The routes live on the API server and is named appropriately.
5. A logout page (`/logout`) that logs the user out and redirects to the `/` page.

Please `git commit` and `git push` at least every 60 minutes to the repository. The commits are not being judged and they're only there for understanding the process and time-keeping. Feel free to use any framework.

If you end up wanting to do more work than over a day, please check in and let me know. The work will be graded and understood more holistically on the final product than something timed on a much tighter timeline.

**Included is a sample of how the game would be implemented if it lived only on the Frontend server process and not the backend API. Feel free to use it as a reference or starting point as the NodeJS backend API would have no access or implementation of `localStorage`.**

## Game Frontend

The game you're making is a simple color-matching game where the player is presented with an RGB value and they must click on the matching color area. Upon clicking a color area, it will give the user feedback that it was correct or wrong and reset the game with all of the data updated. The name, win, and loss data are stored in the _backend_ of the application (which may just be an in-memory object or off-app storage) and is reset upon login.

The game looks like the following:

![Color Game Mockup](color-game.png 'Color Game Mockup')

When the user loads the page, _the data below is provided by the server_. This includes the following (from the server):

- logged in user's name for the header
- their current wins and losses
- the current random RGB color they're trying to match (show with FIND THIS COLOR in the center objective area, this area should be white and uncolored)
- 6 color areas that have random RGB values as their background color with one of the areas having the correct color that the player is trying to match (correct position should be randomized)
- the time in San Francisco and New York (use [momentJS](https://momentjs.com/) in the backend to accomplish this)

Upon clicking any color area, it `POST`s to the backend whether it was correct (you can use the frontend to determine correctness), updates the backend data for wins/losses accordingly, and resets the game without a page reload with the above data coming from the backend (make sure to update wins/losses, current random RGB color, the 6 color areas, and San Francisco and New York times to the frontend).

In addition, create a logout button (that fires the `/logout` route) in the top right of the game and a login page that accepts a username and password when the user isn't logged in.

The container can be any fixed square width and height values, so no need to factor in responsive design unless you want to. The color areas are equal in size, some are just horizontal and others are vertical. Beyond that, feel free to style the above in whatever colors, typography, etc. that you want--we look forward to seeing the final application!

Feel free to use any React-powered framework or boilerplate for the frontend and NodeJS-powered framework or boilerplate for the backend.

## Choose additional feature(s)

You must choose at least one additional feature to implement on this application from the following options:

- Use CSS Grid for the display and use a Google Font for font(s) in the application.
- Use off-app storage such as a database (that isn't Firebase) for users and their game information.
- Deploy this application somewhere with the API not supporting CORs.

Bonus points for handling more.
