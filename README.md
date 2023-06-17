# TravelApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Idea
An application that allows you to keep a record of your trips and provides you with information about certain destinations you may be interested in. It stores information about registered **users** (username and email), **trips** (destination, start date, end date, image url, list of places to visit and privacy status) and **featured** trips (destination, story, image url and list of places to visit).

## Design
The Travel App has three types of areas with the following functionalities.

* Guest area:
    * Guests can access the guest homepage;
    * Guests can register and login;
 * User area:
    * Users can access the user homepage;
    * Users can see all featured trips and the section with the most liked trips;
    * Users can check details for the featured trips, like them or write a review about them;
    * Users can create trips and preview the details before the record is saved;
    * Users can edit and delete existing trip that they have created;
    * Users can check a list of all trips they have created and details for each one;
* Admin area
    * Admins can access the user homepage;
    * Admins can see all featured trips and the section with the most liked trips;
	* Admins can see trips create by all users if the privacy status is public;    
	* Admins can create a featured trip from a user trip and edit the information provided by the user. Featured trip data can be previewed before the record is saved;

* Other
   * Users and Admin can logout from any page and after successful action will be redirected to the guest homepage.
   
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Backend
The application uses [Cloud Firebase™](https://firebase.google.com "Cloud Firebase™") as a backend.

