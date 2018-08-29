# IOT-Decoder - NodeJS Solution

For IoT Decoder, here is propose a JSON file to handle data format.

Previous work : 

1. Please install nodejs firstly, this solution is developed by v8.9.0

   https://nodejs.org/dist/v8.9.0/

2. Download source code and use "npm" to install node modules.

   $cd IOT-Decoder

   $npm install

3. Download redis.

   https://redis.io/download

4. For now, both udp and api server is connect to 127.0.0.1 (redis server).

*******************************
Usage :

1. Run udp server & api server

   udp server:

   $cd /IOT-Decoder/udpServer

   $npm start

   api server:

   $cd /IOT-Decoder/apiServer

   $npm start

2. open browser and URL is http://127.0.0.1:3000/

3. Please use packer sender to test it.

************************************
Data format usage :

1. Please check the dataFormat.json file:

   PATH : /IOT-Decoder/udpServer/dataFormat.json

   you should define:

   Package Name:
   
      "Type ID" : "number"
   
      "Type Field" : "number"
   
      "Data":
   
         "Data name":
      
               "level" : "number"

               "Data fields" : "num,num,num,num"

               "Data Unit" : "string" (option)

Please flow the format define of dataFormat.json to define new package.
