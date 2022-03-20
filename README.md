# Bookias | online Book Store || MERN
E-commerce site with all functionality like payment , admin penal etc
****
## Visit website - [bookias.herokuapp.com](https://bookias.herokuapp.com/)

for admin Login -- please DM me for credential.
> [Instagram](https://www.instagram.com/narendra_dewasi/) || [radioactivenarendra@gmail.com](mailto:radioactivenarendra@gmail.com)
#

## Features
> bookias is an online Book Store.
* MERN stack
* custom authentication- with forgot password, reset password
* user stays logged in after closing site using JWT TOKEN
> default user sign up will assign USER role . who doesnt have admin rights. admin can change user Role in admin Penal
* user State and Cart is managed by REDUX
* user profile. - can see his order history , cancel order. update profile
* payment is done using Razor pay gateway
> Admin Panel
* admin dashboard with total sales, outofstock items, total products etc
* admin can manage all user, delete user, change Role
* admin panel has order page. where he can see all orders and update order status or cancel order
* products , admin can add new products or update products, add stocks
#
* FrontEnd (ReactJS) and BackEnd is maintained  separately

# To run this repo in your local server [development mode]
> clone this repo to your local machine (download this folder)
```
cd clone https://github.com/napiyo/bookias-online-Book-Store.git
```
> make sure you have git - if dont search on google - "git". paste this above code gitbash only
* now you'll to add some configuration
### # create config.env file inside backEnd > config folder 
add these config into that config.env
* PORT = 4500
* endPoint = http://localhost 
* dbURL =```MONGODB URL```
* JWT_SECRET =```RANDOM JWT SECRET KEY```
* JWT_EXPIRES_IN = 5d
* COOKIE_EXPIRE = 5
* RESET_PASSWORD_TOKEN_EXPIRES=15
* SMPT_SERVICE= "gmail"
* SMPT_MAIL=```YOUR GMAIL EMAIL TO SEND FORGOT PASSWORD MAILS```
* SMPT_PASSWORD=```YOUR GAMIL PASSWORD```
* SMPT_HOST=smtp.gmail.com
* SMPT_PORT=465
* SITE_MODE=DEVELOPMENT

### # CREATE .env file insite frontEnd
add these config into .env file
* REACT_APP_API_BASE_URL = `your api base url`
* REACT_APP_RAZORPAY_KEY = ```razor pay key```

### lets run this app in dev mode - {frontEnd and backEnd Hosted on diff ports}
> open terminal inside this cloned folder
```
npm i
```
```
cd backEnd
```
```
npm i
```

```
npm run dev
```
> open new terminal - keep above terminal running
```
cd frontEnd
```
```
npm i
```
```
npm start
```
