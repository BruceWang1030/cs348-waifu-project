# cs348-waifu-project

### Requirements

Your system must have `npm` and `nodejs` for this to work. Additionally, you need to be able to make a connection to a `MySQL` database.

### Setting up the project

A `config.json` file is required for the server to start.

Alternatively `config-local.json` can be provided for a local database configuration.

Config files should look like this:

    {
    	"database": {
    		"host": "yourhostname.tld",
    		"user": "username here",
    		"password": "password here",
    		"database": "database here"
    	}
    }

The database schema should be generated by running the create\_table.sql

Then to install the npm dependencies:

    npm install

### Running the project

	npm start

or optionally to start on a custom port:

	PORT=<your port> npm start
