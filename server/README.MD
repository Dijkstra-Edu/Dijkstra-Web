# Server Services

All server services reside here

Calls can be made to the following APIs:
- 3rd Party API's - These cases are handled sepereately - Through /server
- Any service function that requires heavy computation

Be very clear with where you want to place services:
- Client Side - lives close to frontend on Dataforge -> /services
    - If it is a user interaction (button click, dashboard load, filter change) - should go here
- Server Side - needs secrets, heavy computation  -> /server
    - If it is a server interaction (admin secret, private token, cron logic, pre-computation, AI/ML logic) - Should remain in this folder