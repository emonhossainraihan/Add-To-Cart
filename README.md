# add-to-cart

A minimalistic "Add To Cart &amp; Place Order" System for an E-commerce website

![image](https://github.com/emonhossainraihan/Notes/blob/master/images/cart.png)

## Available Scripts

In the backend `cd backend/` directory, you can run:

### `npm run watch`

Runs the node server in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

automatically restarting the node application when file changes in the directory are detected

In the frontend `cd frontend/` directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:6000](http://localhost:6000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Additional infomation

For backend I didn't use any database which give me to explore some cool features of NodeJS. Instead of saving my data in any database I save them into JSON file
which give me much flexible to change those data. Because I didn't include any user authentication system that's why I inter-related products and orders.
In future I will try to add user authenticated system then there will be no relationship with orders and products instead the only
way to retrieve products information will handle by the `userId`.

> I tried to use minimal information to retrieve product infomation which will reduce the complexity of query and less data to store.

## available route:

| URL                                     | available HTTP method |
| --------------------------------------- | --------------------- |
| http://localhost:6000/products          | GET/POST/PUT/DELETE   |
| http://localhost:6000/products/:id      | GET/POST/PUT/DELETE   |
| http://localhost:6000/orders            | GET/POST/PUT/DELETE   |
| http://localhost:6000/orders/:productId | GET/POST/PUT/DELETE   |
|                                         |

## About Me

👉 [stackoverflow](https://stackoverflow.com/users/9138425/emonhossain)
