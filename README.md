# Scheduler 

> Deployment of frontend on vercel has time issues as the vercel follows the utc timezone and not local. Thus, the code for development and production slightly differs however can be installed locally through the steps mentioned below in the docs.

This feature that allows students to submit weekly preferences for attending class in-person or remotely. The tool then assigns available seats to students who want to physically attend class and provides the faculty with a roster of who has been cleared to attend.

## 🚀 &nbsp; Features 

1. Student is prompted on each Saturday to choose to opt between in-person or remote classes.  
2. A status of the student is as followed - remote, designated, attend, absent
3. If a student chooses in-person classes for the week, a seat is assigned for the student and is given a particular seat_no and the status is changed to designate. The designated student name and seat_no are sent to the dashboard of each faculty of the student. 
4. For the in-person opted students,  a student arrives at time t1 for a s   ubject, and when arrives and moves to its respective seat, needs to scan a QR code on the seat. If this QR code seat_no matches with the respective student seat_no then the status in the dashboard of the subject faculty changes to attending for the student only if the time at which the request is sent and the starting time of the subject class is <= 10 min. In this manner, automatic attendance for the in-person student is done for each subject. 
5. For the remote opted students, a google meet link is provided once the student enters the meet, the time is recorded on the time of entering for the student and the status has been changed to attending if a student enters the meet link in the first 10 min of the subject class. 
<br/><br/>

## ⚒️ &nbsp; Deployment 

1. Client side - Vercel (https://microsoft-engage-21.vercel.app/)
2. Server side - EC2 (http://ec2-13-232-90-241.ap-south-1.compute.amazonaws.com:4000)
3. Credentials to utilize for students (for login) - 
    ```json
    {
        "email": "u18co059@coed.svnit.ac.in",
        "password": "Test#123"
    }
    ```
4. Credentials to utilize for faculty (for login) - 
    ```json
    {
        "email": "upr@coed.svnit.ac.in",
        "password": "Test#123"
    }
    ```
<br/><br/>

## 💻 &nbsp; Cloning the repo on your local machine 

1. Clone - `git clone https://github.com/AemieJ/microsoft-engage-21.git scheduler`
2. Move into directory - `cd scheduler`
<br/><br/>

## 💻 &nbsp; Prerequisites 

1. Node and NPM - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Yarn [optional] - https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
3. PostgreSQL - https://www.postgresql.org/download/
<br/><br/>

## ✨ &nbsp; Client Side
Client side deals with the front-end user interactive code. The section include wireframe model link, followed by the tech stacks used and how to run the client on your local machine.

### 📌 &nbsp; Wireframe prototype link: 
Figma Link - https://www.figma.com/file/peJwosnp6l4tXk6k6VgyvW/Microsoft?node-id=0%3A1

### 📌 &nbsp; Tech Stack:
1. Next JS + React
2. Fetch 
3. React Bootstrap 

### 📌 &nbsp; How to run locally on your machine: 
1. Move to `/config/server.js` and replace `const dev = 'production'` with `const dev = 'development'`. Perform this similar step with `/config/db.js` file.

2. Run `cd client` after cloning the repository and create a new **.env** file and include the following key-value pairs for utilizing the mail service - 
    ```
    GMAIL_USER = example@gmail.com
    GMAIL_PASS = Test#123
    ```

    For the testing purpose, you can use following credentials - 
    ```
    GMAIL_USER = bginger436@gmail.com
    GMAIL_PASS = GingerAle#945
    ```

3. Following this, go to your chrome browser with the gmail account and sign in with the credentials and perform the following - 
- Disable 2 factor authentication
- Enable Low secure app access 
- Click this [link](https://accounts.google.com/DisplayUnlockCaptcha) and enable it. 

4. As the mail service is enabled, you will need to make a few change in the lines of code to perform the preferences option using the local timezone in development phase. Move to `/pages/subject/[code]/[date]/preferences.js` file and within this replace the lines **[29-36]** with the following code - 

    ```javascript
    let splits = date.split('-')
    let timeSplit = from.split(':')
    let fromEpoch = new Date(splits[2], (Number(splits[1]) - 1).toString(), splits[0], timeSplit[0], timeSplit[1]).getTime()
    timeSplit = to.split(':')
    let toEpoch = new Date(splits[2], (Number(splits[1]) - 1).toString(), splits[0], timeSplit[0], timeSplit[1]).getTime()
    ```

5. After performing this changes, open your terminal within this client directory and perform the following commands - 
    ```bash
    $ yarn
    $ yarn dev
    ```
    **(or)**

    ```bash
    $ npm install
    $ npm run dev
    ```
<br/><br/>

## ✨ &nbsp; Server side
Server side is the backend code which creates the api to be utilized by the client. The section include the er diagram link, postman api link, tech stacks utilized and how to run it locally on your machine.

### 📌 &nbsp; ER diagram link:
drawSQL - https://drawsql.app/dev-tree/diagrams/scheduler-microsoft-engage

### 📌 &nbsp; Postman API
API Public link - https://www.getpostman.com/collections/008bd1f3aca86bf89c72

### 📌 &nbsp; Tech Stack: 
1. PostgreSQL
2. NodeJS + Express
3. Typescript

### 📌 &nbsp; How to run locally on your machine: 
> You can run the server locally on your machine or utilize the deploy server link.

1. Run `cd server` after cloning the repository and create a new **.env** file and include the following key-value pairs for enabling the postgres db and jwt - 
    ```
    DB_NAME=ajeoucay
    DB_USER=ajeoucay
    DB_PASS=8zHG54y_gC7LjhDIH6O5ug6rFiqZ2mrq
    DB_HOST=castor.db.elephantsql.com
    DB_PORT=5432
    JWT_SECRET=238dasAd230dj
    ```

2. After performing this changes, open your terminal within this server directory and perform the following commands - 
    ```bash
    $ yarn
    $ yarn start
    ```

    **(or)**
    
    ```bash
    $ npm install
    $ npm run start
    ```