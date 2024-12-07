# Chat-bot Project

A modern chat-bot web application built with React and Firebase, designed to help businesses interact with their customers. The application checks for the existence of a username and fetches messages from Firebase if the user exists, or creates a new user otherwise. It features real-time messaging and is hosted on Firebase.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Firebase Hosting](#firebase-hosting)

## Project Overview
This project is a customer-chat bot platform that allows business owners to manage their customer interactions seamlessly. Built using React for the frontend and Firebase for the backend, the app is designed to provide users with an engaging and responsive interface.

### Key Features
- **User Check**: When a user signs in, the application checks if their username exists in the Firebase Firestore. If not, it creates a new user.
- **Real-time Messaging**: The chat-bot allows business owners and users to interact in real-time, with messages fetched from Firebase.
- **Dynamic Chat List**: A real-time list of users is displayed, fetched from Firebase Firestore.
- **Firebase Integration**: Firebase is used for storing chat messages, user management, and hosting.

## Technologies
- **Frontend**: React, React Router, LINK
- **Backend**: Firebase Firestore
- **Authentication**: Custom username-based check and user creation
- **Styling**: plane css.
- **Deployment**: Firebase Hosting

## Setup and Installation

Follow the steps below to get the project up and running on your local machine:

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/your-username/chat-bot.git
cd chat-bot


2. Install Dependencies
npm install

3. Set Up Firebase
Go to the Firebase Console.
Create a new Firebase project or use an existing one.
Enable Firebase Authentication and Firestore Database for your project.
Obtain your Firebase project credentials (API key, project ID, etc.).
Create a .env file in the root of your project and add the firebase configuation

4. Run the Development Server
npm start


Deployed URL- https://chat-bot-1b420.web.app/