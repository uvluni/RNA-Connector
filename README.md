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

