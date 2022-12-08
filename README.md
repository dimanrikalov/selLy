#SelLy

!IMPORTANT: SELLY IS OFFICIALLY LIVE: https://selly-client.web.app

#Introduction

SelLy is a MEAN stack web application. It is essentially a simplified version of OLX (A well-known platform for selling second hand items). The functionality of the application covers the basic operations you would find in almost every web application (Create, Remove, Update, Delete). The app contains 3 collections on which you can execute these operations (User, Listing, Comment) (MongoDB models are named accordingly). The main app folder is divided in 2 parts: "client" and "server".

#Client
The client folder contains the Angular App folder, assets folder and a folder with vanilla-tilt.js library used for some of the elements of the web application. To start the angular app, you will need to type "npm i" inside the console, within the "client" folder. Then type "ng serve" from within the "client/app/src/app" folder The angular app starts on port 4200.

#Server
The server folder aims to follow the MVC structure as much as possible, it consists of "config", "controllers", "middlewares", "models" and "service" folders as well as "index" and "router" files. "index.js" is the entry point for the server side of the application. The "config" folder is responsible for initializing the express app as well as the mongo database (mongoose). There you can find the settings to the ports as well as specific to the authentication process options (FOR FUTURE IMPLEMENTATION). The express app starts on port 3000.
#Endpoints

Main URL: "http://localhost:3000"

1. Authentication: sub URL: "/auth"

    1.1. Register: sub URL: "/register", payload: method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

        The body must include these key-value pairs:
        1. "email" : must meet the criteria "some-text@some-text.some-text"
        2. "name" : first and last names split by a single space. Example: "John Doe"
        3. "profileImage" : a profile image which is a valid URL link (starts with http:// or https://)
        4. "password" :  minimum length 4 characters

    1.2. Login sub URL: "/login", payload: method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

        The body must include these key-value pairs:
        1. "email" : the email used when registered
        2. "password" : the password used when registered 

2. Catalog: sub URL: "/catalog"
    2.1 sub URL: "/" (GET request), returns all listings from the database

    2.2 sub URL: "/create" (POST request), create a new listing
    payload: method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. "item" : must start with a capital letter and have length of 2-20 characters (required)
        2. "brand" : no requirements
        2. "imageUrl" : a listing image which is a valid URL link (starts with http:// or https://) (required)
        3. "description" : minimum length 15 characters (required)
        4. "location" : Must fulfill the requirement: "Plovdiv, Bulgaria" (2 names that start with capital letter split by "," and a " ") (required)
        5. "price": Must be of type number, minimum value 0 (required)
        6. "userId": Mandatory for veryfing that the user is logged and to know which user listing collection to update

    2.3 sub URL: "/:listingId/details" (GET request) method: returns listing with an id matching the one from the URL

    2.4 sub URL: "/:listingId/edit" (POST request) method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. "item" : must start with a capital letter and have length of 2-20 characters (required)
        2. "brand" : no requirements
        3. "imageUrl" : a listing image which is a valid URL link (starts with http:// or https://) (required)
        4. "description" : minimum length 15 characters (required)
        5. "location" : Must fulfill the requirement: "Plovdiv, Bulgaria" (2 names that start with capital letter split by "," and a " ") (required)
        6. "price": Must be of type number, minimum value 0 (required)
        7. "userId": Mandatory for veryfing that the user is logged and to know which user listing collection to update

    2.5 sub URL: "/:listingId/delete" (POST request) method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. userId Mandatory for veryfing that the user is logged and to know which user listing collection to update

    2.6 /:listingId/save (POST request) method: 'POST', credentials: 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),
       The body must include these key-value pairs:
        1. "listingId" :
        2. "userId" : no requirements

    !IMORTANT The exact same request is being executed for adding and removing a listing to a user's saved collection

    2.7 /:listingId/comments

      2.7.1 /create (POST request) method: 'POST', credentials 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. "content
        2. "listingId"
        3. "userId" Mandatory for veryfing that the user is logged and to know which user listing collection to update

    2.7.2 /:commentId/edit (POST request) method: 'POST', credentials 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. "newContent
        2. "commentId"
        3. "listingId"
        4. "userId" Mandatory for veryfing that the user is logged and to know which user listing collection to update

    2.7.3 /:commentId/delete (POST request) method: 'POST', credentials 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),

     The body must include these key-value pairs:
        1. "commentId"
        2. "listingId"
        3. "userId" Mandatory for veryfing that the user is logged and to know which user listing collection to update

3. Profile: sub URL: "/profile" (POST request) method: 'POST', credentials 'include', headers: 'Content-Type': 'application/json', body: JSON.stringify(body),
The body must include these key-value pairs:
    1. "userId" Mandatory for veryfing that the user is logged and to know which user listing collection to 
    
4. About: sub URL: "/about" (GET request) method: returns an object with stats about the database collections
