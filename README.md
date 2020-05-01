# EZ.Notify-Cron

This project is a cron task for send messages scheduled  

[Front-end project](https://github.com/ezDevs/ez-notify)


## Configuration

After cloning the project:

In firebase, you need to create a user for the cron functions access the database, and add in your .env.json.  

Update .env.json
```
{
  "firebaseConfig": {
    "apiKey": "xxxx",
    "authDomain": "xxxx",
    "databaseURL": "xxxx",
    "projectId": "xxxx",
    "storageBucket": "xxxx",
    "messagingSenderId": "xxxx",
    "appId": "xxxx",
    "measurementId": "xxxx"
  },
  "userFirebase": "xxx",
  "passwordFirebase": "xxx"
}
```


## Deploy

``` bash
# install dependencies
$ cd fucntions && yarn install

# install firebase tools
$ npm install -g firebase-tools

# login in firebase
$ firebase login 

# uploading your functions
$ firebase deploy --only function
```
Readm more in: [Firebase functions quick start](https://firebase.google.com/docs/functions/get-started)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## About [Ezdevs](https://ezdevs.com.br/)
Ezdevs is a software development company.
We offer end-to-end solutions to companies that believe that technology is a key factor in the success of big businesses.
We also work with headhunting and outsourcing, allocating trained professionals from different technologies in your project.

## License
[MIT](https://choosealicense.com/licenses/mit/)
