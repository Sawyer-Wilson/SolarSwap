# SolarSwap

SolarSwap is a group senior project currently under development. It is 
an online resource that connects people who generate excess solar energy to 
people who want to use solar without the hassle of installation. Sellers can 
generate extra income while buyers can save money on their utility bill!

## Usage

Visit the live web page at [solarswap.org](https://solarswap.org)

## Running the Application Locally

### Downloading the Project

Download the code by cloning the repository to your local device

    git clone https://github.com/gracejmccarthy/SolarSwap.git SolarSwap
    
Enter the new project directory and install the required dependencies

    cd SolarSwap
    npm install

### Creating a .env file

In order to successfully run this application, you will need to create a file 
named *.env* inside the *server* directory. This file supplies the application
with the needed environment variables. The environment variables that must be 
set are: `DB_USER`, `DB_PASSWORD`, and `DB_NAME`. This file is not in the Github
repository for security reasons. 

### Starting the Application

Once the project has been download and a *.env* file created, it can be run using the command:

    npm run dev
    
You can now see the application running at 
[http://localhost:3000](http://localhost:3000)! This will start both the React 
Front End Application and Express Server Application. These can be started 
individually using either 

    npm run client

or 

    npm run server
    
## Using a local production environment

During development, the client and server applications are hosted seperately 
but in production, the server serves the static React files directly to the 
browser. To run the application like this, add the following environment 
variable to the *.env* file 

    NODE_ENV=production

You must then build the application with

    npm run build

And then run the application using the command

    npm run server
    
The application is now running at [http://localhost:3002](http://localhost:3002)
