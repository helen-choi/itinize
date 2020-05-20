# Itinize (In progress)

Itinize is a full-stack web application for travelers who want to organize their travel plans.

## Live Demo

Try the application live at https://itinize.helen-choi.com

## Technologies Used

- React.js
- Webpack 4
- Babel
- Bootstrap 4
- dotenv
- node-fetch
- react-routers
- Node.js
- HTML5
- CSS3
- font-awesome
- AWS EC2
- PostgreSQL

## Features

- Users can add a destination.
- Users can view added destination(s).
- Users can edit destination(s).
- Users can delete destination(s).
- Users can add itineraries.
- Users can view itineraries. 
- Users can edit/delete itineraries. 
- Users can add flights.
- Users can view flights.
- Users can delete flights.
- Users can add lodging.
- Users can view lodgings.
- Users can delete lodgings. 


## Preview
![Add Destination Demo](https://github.com/helen-choi/itinize/blob/master/server/public/images/add-destination-demo.gif "Add Destination Demo")

## Development

### System Requirements 
- Node.js 10 or higher
- NPM 6 or higher
- postgreSQL

### Getting Started
1. Clone the repository.
```
git clone https://github.com/helen-choi/itinize.git
cd itinize
```
2. Install all dependencies with NPM.
```
npm install
```
3. Import the example database to postgreSQL
```
npm run db:import
```
4. Start the project. Once you can view the application by opening http://localhost:3000 in your browser
```
npm run dev
```




