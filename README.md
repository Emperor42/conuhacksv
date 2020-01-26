# conuhacksv
repo for CONUHACKS V

web handles to make
FROM USER COLLECTION
-Admin Only 
--addTask: add a task to this group 1
--editTask: edit a task in this group 2, uses code
--removeTask: remove a task from this group 3
--addUser: add a user to this group 4
--removeUser: remove a user from this group 5
-User 
--claimTask: claim a task for a specific user (expand to many later on) 6
--endTask: stop doing this task, it and subtasks are sent back in* 7
--completeTask: complete this task/subtask 8
--splitTask: splits the task into movable subtasks 9
userData: returns the user data in a printable way? 10
updateData: update the user data 11

FROM GROUP & TASK COLLECTION
--findOpenTasks: gets all the tasks from this group which you can do as they have not been claimed 12
--findUserTasks: gets the tasks that the user is trying to get done from the database 13
--validateTask: makes sure that the time values for the task are done up properly based on resize on the front end (moving and such on the cal) 14
--findSplitData: how many splits does the current task actually have(single user may not be needed) 14