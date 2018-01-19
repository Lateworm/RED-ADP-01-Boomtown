# Boomtown Starter

## Installation

Download the repo, then run:

```bash
cd client && npm install
```

## Start-up

In the `client` directory, run:

```bash
npm start
```

and from inside the `server` directory:

```bash
json-server --watch db.json -p 4000
```

Happy coding :)

## To-do

do PropTypes all over the place
get filter working
Make the footer and call it in Layout.js
figure out turntable unavailability
Simplify the not found container by removing the unused file and moving it to components
avoid over-fetching / use query strings
link the B logo to the homepage
rename items to users in redux/modules/profile.js
