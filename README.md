
Table of Contents

    Introduction
    Getting Started
        Prerequisites
        Installation
    Usage
    API Endpoints
    Authentication
    Contributing
    License

Introduction

This is the backend of a job application system built using Flask, a Python web framework. The application allows users to register, log in, view job listings, apply for jobs, and manage their job applications.
Getting Started
Prerequisites

Before running the application, ensure you have the following dependencies installed:

    Python 3.7 or higher
    PostgreSQL database
    Virtual environment (optional but recommended)

Installation

    Clone the repository to your local machine:

    bash

git clone https://github.com/your_username/job-application-backend.git

Navigate to the project directory:

bash

cd job-application-backend

Create a virtual environment (recommended):

bash

python3 -m venv venv

Activate the virtual environment:

bash

source venv/bin/activate

Install the required Python packages:

bash

pip install -r requirements.txt

Configure the database URL in app.py:

python

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://your_db_user:your_db_password@your_db_host/your_db_name'

Initialize the database:

bash

    flask db init
    flask db migrate
    flask db upgrade

Usage

To run the application, use the following command:

bash

python app.py

The backend server will start running on http://localhost:5555.
API Endpoints

    POST /register: Register a new user.
    POST /login: Log in as an existing user.
    GET /user: Get a list of all users.
    GET /user/<int:id>: Get a user by their ID.
    GET /Availablejobs: Get a list of available job listings.
    POST /Availablejobs: Create a new job listing.
    GET /SearchJob/<int:id>: Get a job listing by ID.
    GET /job-applications: Get a list of job applications.
    POST /job-applications: Create a new job application.
    GET /job-application/<int:id>: Get a job application by ID.
    PATCH /job-application/<int:id>: Update a job application.
    DELETE /job-application/<int:id>: Delete a job application.

Authentication

The application uses JSON Web Tokens (JWT) for authentication. After registering or logging in, you will receive an access token that you can use to access protected endpoints by including it in the request headers.

Example header for accessing protected endpoints:

json

{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}

Contributing

If you would like to contribute to this project, please follow our contribution guidelines.
License

This project is licensed under
