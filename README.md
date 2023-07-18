you can run it using docker.
the task divided to 3 parts:
- backend
- frontend
- notification

the backend is a simple rest api that get the data from the frontend and save it to the database.
the frontend is a simple react app that get the data from the database and show it in the webpage.
the notification service is running each day in the 12PM and checks if there's any todo item with due date today or tomorrow and send a notification to the user.