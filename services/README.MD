# Client Services

All client serives reside here

All services make calls through CoreAPI Service:

All API calls that are made through this service

Calls can be made to the following APIs:
- Dataforge
- Gitripper
- Helios
- Archivist
- 3rd Party API's - These cases are handled sepereately - Through /server

Be very clear with where you want to place services:
- Client Side - lives close to frontend on Dataforge -> /services
- Server Side - needs secrets, heavy computation -> /server