# Youtube-Sharing


## Table of contents

[1. Introduction](#1-Introduction)

[2. Prerequisites](#2-Prerequisites)

[3.	Installation & Configuration](#3-installation--configuration)

[4. Database Setup](#4-Database-Setup)

[5. Running the Application](#5-Running-the-Application)

[6. Docker Deployment](#6-Docker-Deployment)

[7. Usage](#7-Usage)


## 1. Introduction
YouTube videos sharing website. 
Viewing a list of shared videos 
Real-time notifications for new video shares: When a user shares a new video, other logged-in users receive a real-time notification about the newly shared video. This notifications can be displayed as a pop-up in the application, and it contain the video title and the name of the user who shared it. 

## 2. Prerequisites
If you want to install the application with Docker, you only need to install Docker on your server (Docker version 24.0.7).

If you want to start the development server, you will need these tools:

- Node.js: version 12.10.0
- MongoDB database

## 3. Installation & Configuration
# Install with docker

1. Build the youtube_sharing_app image: 
```console
    cd App
    bash buildImage.sh
```
2. Build the youtube_sharing_app image:
```console
    cd Web
    bash buildImage.sh
```
3. Prepare a folder on your server to save configuration and log files of the application. Copy all contents from the Deploy folder to <--your folder-->.

4. Change the working directory to <--your folder--> and create necessary folders:

```console
    cd <--your folder-->
    bash mkdirlogs.bash
```

5. Edit two configuration files: youtube_sharing_app\.env and youtube_sharing_web\config.json. Replace the IP addresses in these files with your server's IP.

6. Start your application:

```console
    cd <--your folder-->
    bash run-all.sh
```

7. Check the service status:
```console
    docker ps
```

If you see three running containers named mongo, web, and app, your application has started successfully. You can visit the URL http://<--your-ip-->:3000 to view the page.

## 4. Database Setup

1. Make folder to mount database file when you run mongodb with docker
```console
    mkdir /mongo-data
```
2. Start database 
```console
    cd <--your folder-->
    bash run-all.sh
```
## 5. Running the Application

1. Install library
```console
    cd App
    npm install
```
```console
    cd Web
    npm install
```

2. Start app service 
```console
    cd App
    npm start
```
3. Start web service
```console
    cd Web
    npm start
```
You can visit url http://lcoalhost:3000 to view this page

## 6. Docker Deployment

1. Build the youtube_sharing_app image: 
```console
    cd App
    bash buildImage.sh
```
2. Build the youtube_sharing_app image:
```console
    cd Web
    bash buildImage.sh
```
3. Prepare a folder on your server to save configuration and log files of the application. Copy all contents from the Deploy folder to <--your folder-->.

4. Change the working directory to <--your folder--> and create necessary folders:

```console
    cd <--your folder-->
    bash mkdirlogs.bash
```

5. Edit two configuration files: youtube_sharing_app\.env and youtube_sharing_web\config.json. Replace the IP addresses in these files with your server's IP.

6. Start your application:

```console
    cd <--your folder-->
    bash run-all.sh
```

7. Check the service status:
```console
    docker ps
```

If you see three running containers named mongo, web, and app, your application has started successfully. You can visit the URL http://<--your-ip-->:3000 to view the page.

## 7. Usage
# Features
1. Viewing Shared Videos

- Upon logging into the application, users can browse through a list of videos that have been shared by other users.
- Each video entry typically includes metadata such as the video title, description, and the user who shared it.
2. Real-Time Notifications

- Functionality: When a user shares a new YouTube video, all logged-in users receive a real-time notification.
- Notification Display: Notifications appear as pop-ups within the application interface.
- Content: Each notification includes the title of the newly shared video and the name of the user who shared it.

# How to Use the Application
1. Creating account

- Access the application using the provided URL.
- Enter your credentials (username and password) to create account.
2. Logging In

- Access the application using the provided URL.
- Enter your credentials (username and password) to log in.
3. Viewing Shared Videos

- After logging in, navigate to the section where shared videos are listed.
- Browse through the list of videos to find content of interest.
- Click on a video title to watch the video directly if embedded.

4. Sharing Videos

- To share a YouTube video, there may be a dedicated button or form where users can paste the YouTube video URL.
- Upon sharing, other logged-in users will receive notifications about the newly shared content.
5. Receiving Notifications

- Stay logged in to receive real-time notifications.
- When a new video is shared by another user, a notification will appear as a pop-up within the application.

6. Logging Out

- Once done using the application, log out to secure your session.