# LOL-GG  
> Real-time LoL Stats! Check your Summoner.   
Currently, this web service only Korean language.  
  
> This is an ongoing project. So not all codes are perfect. If there is a good way to develop this project, please contribute.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d6059b01-d30f-4869-a696-c58f1dba6c87/deploy-status)](https://app.netlify.com/sites/lol-gg/deploys)
  
Website link: https://lol-gg.netlify.app  
  
## Project stack  
  
Following items are core technologies use in this project:

- Typescript >= 3.8.3 
- React >= 16.9.0  
- GraphQL (Apollo Server)  
- Recoil  
- CSS in JS (styled-components)  
- Netlify  
- Netlify Lambda Function  
- Netlify Large Media
  
## Running on your machine  
This instruction will get you copy of the project up and running on your machine for development or testing purposes.  
  
### Preparation  
- Node >= 10.17.0  
- yarn
- Netlify Account  
- Netlify CLI
  
### Installation  
1. Clone the project
```
$ git clone https://github.com/byseop/lol-gg.git
```  
2. Install packages from yarn  
```
$ cd lol-gg
$ yarn
```
3. Rename .env.exmaple to .env (env file will not upload to online - ```.gitignore```),
```
# API KEY
RIOT_API_KEY=YOUR RIOT API KEY
```
4. Connect the repo to your netlify, and set enviroment variable(RIOT API KEY).  
  
4-1. Install netlify large media.
```
npm install -g netlify-cli
...
...
netlify plugins:install netlify-lm-plugin
...
...
```
  
4-2. Input your netlify app key into `/.netlify/state.json`.
```
{
	"siteId": "xxxx..."
}
```
  
4-3. Link to netlify
```
netlify link
...
...
netlify lm:setup
...
...
```
  
5. Start netlify lambda development server, check your playground to ```http://localhost:9000/stats```.  
```
$ yarn
  ...
  ...

$ NODE_ENV=development yarn start:lambda
```  
6. Start frontend development server  
```
$ yarn start
```
  
## Contributions  
Any kinds of contributions are welcomed. Since the test codes of the project is not completed yet, pull requests might take a while.