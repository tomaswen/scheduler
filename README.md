# Interview Scheduler

Interview scheduler is an application that allows a student to book an appointment with a mentor, Monday to Friday from 1 p.m. to 5 p.m. . Data is persistent and can be fetched from [scheduler-api](https://github.com/tomaswen/scheduler-api).

## Tech Stack

**FRONT-END:** ReactJS, CSS, HTML
**BACK-END:** NodeJS, Express, PostreSQL
**TESTING:** Jest, Cypress, Storybook

## Screenshots

### Application

[Scheduler Homepage](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-form.png)
Home page will fetch data from api and display the appointments booked

[Making an Appoinment](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-adding.png)
Pressing the add sign will allow student to make an appointment by inputing name and selecting interviewer

[Edit or Delete on hover](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-hover.png)
Hovering on the appointment will display buttons where student can edit or delete an appointment

### Validation Errors

[No Name Error Message](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-no-name.png)
Student can not book an appointment when name input is blank
[No Mentor Error Message](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-no-interviewer.png)
Student can not book an appointment without selecting a mentor

### Loading Status

[Deleting status](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-transition-deleting.png)
Deleting status is shown while an axios request is made to the server to DELETE interview

[Saving Status](https://github.com/tomaswen/scheduler/blob/master/docs/scheduler-transition-saving.png)
Saving status is shown while an axios request is made to the server to PUT interview

## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-hooks-testing-library
- react-scripts

## Getting Started
- Install all dependencies (using the `npm install` command).
- Fork the [server](https://github.com/tomaswen/scheduler-api), and follow the instructions to set it up
- Run both the server and the client using `npm start`.
