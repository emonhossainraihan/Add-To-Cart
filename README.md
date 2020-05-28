# add-to-cart

**A minimalistic "Add To Cart &amp; Place Order" System for an E-commerce website**

![image](https://i.imgur.com/JBeSSkt.png)

## Available Scripts

### `npm start`

This will run `npm run watch` and `yarn start` concurrently including changing directory commands and `npm install` for installing their dependencies.

In the backend directory, you can run:

### `npm run watch`

Runs the node server in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

automatically restarting the node application when file changes in the directory are detected

In the frontend directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3006](http://localhost:3006) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Additional infomation

For backend I didn't use any database which give me to explore some cool features of NodeJS. Instead of saving my data in any database I save them into JSON file
which help me to play with JSON and `fs` module. Because I didn't include any user authentication system that's why I inter-related products and orders. In future I will try to add user authenticated system.

> I tried to use minimal information (using only `productId`) to retrieve product infomation to render orders which will reduce the complexity of query and less data to store.

## available route:

| URL                                     | available HTTP method | description                                             |
| --------------------------------------- | --------------------- | ------------------------------------------------------- |
| http://localhost:3006/products          | GET/POST/DELETE       | get all products/ post new product/ delete all products |
| http://localhost:3006/products/:id      | GET/DELETE            | get specific product/ delete specific product           |
| http://localhost:3006/orders            | GET/DELETE            | get all orders/ delete all orders                       |
| http://localhost:3006/orders/:productId | GET/POST/DELETE       | decrease/ increase/ delete quantity of a specific order |

## About Me

👉 [stackoverflow](https://stackoverflow.com/users/9138425/emonhossain)
