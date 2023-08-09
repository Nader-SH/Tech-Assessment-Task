# Tech-Assessment-Task
<br />

<div align="center" id="top">
    <img src="https://github.com/Nader-SH/Tech-Assessment-Task/assets/64221231/8ec2470d-0d3a-4ee1-bacf-2ee90d160406"  height="99" alt="Logo" >

  <h3 align="center">
    Tech Assessment Task For Onex
  </h3>
</div>
<br />
<br />
<br />

## Description:
A full-stack web application for managing a personal book collection. The application should allow users to add new books to their collection, view the list of books they have.

## [**Database Schema**:](https://drawsql.app/teams/nader-shak/diagrams/onex-beginning-of-the-technical-assessment)

![Onex - Beginning of the technical assessment _ DrawSQL - Google Chrome 8_9_2023 11_33_02 PM](https://github.com/Nader-SH/Tech-Assessment-Task/assets/64221231/f4459dbf-c214-45ea-8b72-d7794c3ab815)


## **Getting Started**  

## :pushpin: **How to launch app locally** :- 

*  clone this repo by typing this command in your terminal:  
`https://github.com/Nader-SH/Tech-Assessment-Task.git`

*  Run in your terminal `npm i` to install packages for the app as general.

*  Run `cd client` and `npm i` to install the packages for the client side Vue Js.


### Database Setup  :clipboard: 

make sure you have installed PostgreSQL and pgcli 

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```

* Run the following command in the database pgcli terminal  
`npm run buildDB` to build database with its tables.


### **Environment variables:**
Environment variables are one of the ways we keep our product secure. If you want to access our app locally you will need to add your own.
- create .env file at the root of your project
- add your Environment variables

  
```sh
DEV_DB_URL= Your development PostgreSQL connect
PORT= Your Port to back end server
SECRET_KEY=  Your token Secret key
API_SECRET= Your cloudinary key
CLOUD_NAME= Your cloudinary Cloud Name 
API_KEY= Your cloudinary key
```
* the DEV_DB_URL be like `postgres://username:password@host:port/databasename`.

## **Technologies**
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [Vue.js](https://vuejs.org/)
* [Sequelize](https://sequelize.org/)
* [PostgreSQL](https://www.postgresql.org/download/windows/)
* [Cloudinary](https://cloudinary.com/)

## **Programmer**
- [Nader Shakshak](https://github.com/Nader-SH)

