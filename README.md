# RNA-Connector
Project Definition:
The program will connect to Omnitracs Routing API, retrieve Planning and maintenance entities (Drivers, Equipment, etc.), and present it in a web browser.

Stack:
Backend: Node.js, Express.js (Axios: JavaScript library used to make HTTP requests from Node)
Frontend: JavaScript, React (HTML/CSS)
Database: MongoDB
Deployment: Heroku
Version Control: Git
Hosting: Local at first

* UI for importing a CSV - V
* Coping and processing the file - V
* Connect the server to Roadnet API
*	GET a Token
*	Pass the Token to another Module
*	Use the Token and the data from the CSV file to create a Location (https://apex-prod-eu-integration.eu.roadnet.com/integration/v1/admin/locations)





*	GET Routes (Hard-coded query parameters in the modules)
*	GET Routes by receiving Route Query parameters injected into the GET Routes Module
*	Save Rotes to DB
*	Create UI for Login
*	Create UI for selecting Route query parameters
*	Create UI for presenting Routes query result

uvluni@gmail.com


08/12/23:
uv: Inside fileHandler, add authentication + token save   -   Done. Token is saved to authToken let
uv: Figure out in Postman how to add a Location   -   Done. Example on Postman Workspace


11/12/23:
uv: Authenticate returns authToken+date time   -   Done. authToken has .token and .date properties
uv: Try creating transformedObject in another file
uv: After I do git add ., there are still changes not staged for commit
uv: Change git user in vs code to uvluni@gmail.com
Esther: Update the server to be able to call add Location according to the Postman test

