## AgEagle Engineering Test
---
This project is an application that contains 

* A server that uses external services (random.org, openweathermap) to generate weather data for randomly generated coordinates
* A UI that presents this data on a map(map created using mapbox)

## Running in development mode

---

### 1. Set up
1. Have node installed on your machine, preferably latest (lts) version
2. Have either yarn or npm installed
3. Install required node packages by running the following: 

    ```bash
        ## If using yarn
        yarn 
        
        ## If using npm
        npm install
    ```
    inside the root directory, the client directory, and the server directory
4. Optain api keys from the following websites (requires to sign up for free accounts)
    * [OpenWeather](https://openweathermap.org/appid#get)
    * [Random.org](https://api.random.org/dashboard)
    * [mapbox](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)
5. Create a secrets.json file from the example json file and edit with the appropriate keys
    ```bash
        ## When in project root
        cd server
        cp secrets.example.json secrets.json
    ```
    Add corresponding keys to secrets.json
         
    ```json with comments
        {
            "OPEN_WEATHER_API": "3ff3jllasd-fake-key-asdfsa",
            "RANDOM_ORG_API": "00000000000",
            "MAP_BOX_API": "000000000"
        }
    ```
### 2. Running development code
1. Start server
    ```bash
        ## Switch to server directory
        cd server
        
        ## Build code
        yarn build
        
        ## Start server
        yarn start

        ## If using npm
        npm run build
        npm run start
    ```
2. Start react-app client 
    ```bash
        ## Switch to client directory
        cd client
        
        ## Run client
        yarn start

        ## If using npm
        npm run start
    ```