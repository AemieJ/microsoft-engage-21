# Schedular 

This feature that allows students to submit weekly preferences for attending class in-person or remotely. The tool then assigns available seats to students who want to physically attend class and provides the faculty with a roster of who has been cleared to attend.

## Features 

1. Student is prompted on each Saturday to choose to opt between in-person or remote classes.  
2. A status of the student is as followed - remote, designated, attend, absent
3. If a student chooses in-person classes for the week, a seat is assigned for the student and is given a particular seat_no and the status is changed to designate. The designated student name and seat_no are sent to the dashboard of each faculty of the student. 
4. For the in-person opted students,  a student arrives at time t1 for a subject, and when arrives and moves to its respective seat, needs to scan a QR code on the seat. If this QR code seat_no matches with the respective student seat_no then the status in the dashboard of the subject faculty changes to attending for the student only if the time at which the request is sent and the starting time of the subject class is <= 10 min. In this manner, automatic attendance for the in-person student is done for each subject. 
5. For the remote opted students, a google meet link is provided once the student enters the meet, the time is recorded on the time of entering for the student and the status has been changed to attending if a student enters the meet link in the first 10 min of the subject class. 

### Client Side

### Server side