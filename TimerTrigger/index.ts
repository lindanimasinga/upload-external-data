import { AzureFunction, Context } from "@azure/functions"
import * as https from 'https'
import { RequestOptions } from "https";

const jsonData = {
    "version": "1.0.0",
    "defaultLocale": "en-GB",
    "title": {
      "en-GB": "Video Stream"
    },
    "externalLinks": {
      "name": {
        "en-GB": "External links"
      },
      "value": [
        {
          "href": {
            "en-GB": "https://sitegaurddashcams.z21.web.core.windows.net?cam=http%3A%2F%2F41.78.221.106%3A10001"
          },
          "title": {
            "en-GB": "Live Video Stream",
            "de-DE": "In Truck Spy App öffnen"
          },
          "description": {
            "en-GB": "By clicking you will be redirected to the Live Video Stream."
          }
        }
      ]
    },
    "data": [
      [
        {
          "name": {
            "en-GB": "Powered by"
          },
          "value": {
            "en-GB": "SiteGuard"
          }
        }
      ],
      [
        {
          "name": {
            "en-GB": "Battery status"
          },
          "value": {
            "en-GB": "95 %"
          },
          "icon": 13
        },
        {
          "name": {
            "en-GB": "Fuel level"
          },
          "value": {
            "en-GB": "104.5 l"
          },
          "icon": 35
        }
      ],
      [
        {
          "name": {
            "en-GB": "Ambient temperature"
          },
          "value": {
            "en-GB": "23° C"
          },
          "icon": 7
        }
      ]
    ]
  }

 const url = "https://csv.telematics.tomtom.com/extern"; 

 function prepareURLCar1(): string {

    var jsonDataString = encodeURI(JSON.stringify(jsonData))
    var apikey = "############"
    var action = "setExternalObjectData"
    var outputformat = "json"
    var objectuid = "1-390874-721755F439"
    var password = "#######"
    var username = "#######"
    var account = "#########"
    var lang = "en"

    return `${url}?lang=${lang}&account=${account}&username=${username}&password=${password}&objectuid=${objectuid}&
                outputformat=${outputformat}&action=${action}&apikey=${apikey}&data=${jsonDataString}`
 }

 function prepareURLCar2(): string {

  var jsonDataString = encodeURI(JSON.stringify(jsonData))
  var apikey = "d1fa7e14-4bf9-48a0-a193-bcabd0d58e00"
  var action = "setExternalObjectData"
  var outputformat = "json"
  var objectuid = "1-390874-6664512291"
  var password = "Ac9dsdmcpYGPfd1"
  var username = "siteguard"
  var account = "#########"
  var lang = "en"

  return `${url}?lang=${lang}&account=${account}&username=${username}&password=${password}&objectuid=${objectuid}&
              outputformat=${outputformat}&action=${action}&apikey=${apikey}&data=${jsonDataString}`
}

function prepareURLCar3(): string {

  var jsonDataString = encodeURI(JSON.stringify(jsonData))
  var apikey = "#############"
  var action = "setExternalObjectData"
  var outputformat = "json"
  var objectuid = "1-390874-721067AAF8"
  var password = "#########"
  var username = "########"
  var account = "#########"
  var lang = "en"

  return `${url}?lang=${lang}&account=${account}&username=${username}&password=${password}&objectuid=${objectuid}&
              outputformat=${outputformat}&action=${action}&apikey=${apikey}&data=${jsonDataString}`
}

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    context.log('Timer trigger function ran!', timeStamp);
    var requestUrl = prepareURLCar1()
    console.log(`Url is ${requestUrl}`)

    https.get(requestUrl, resp => {
        console.log(`response recieved with statusCode ${resp.statusCode}`);
        if(resp.statusCode == 200){
            console.log("successfully uploaded the data to telematics dashboard");
        } else {
            console.log("failed to load the data to telematics dashboard");
        }
        console.log(`response body ${resp}`);
    })

    context.log('Timer trigger function ran!', timeStamp);
    var requestUrl = prepareURLCar2()
    console.log(`Url is ${requestUrl}`)

    https.get(requestUrl, resp => {
        console.log(`response recieved with statusCode ${resp.statusCode}`);
        if(resp.statusCode == 200){
            console.log("successfully uploaded the data to telematics dashboard");
        } else {
            console.log("failed to load the data to telematics dashboard");
        }
        console.log(`response body ${resp}`);
    })

    context.log('Timer trigger function ran!', timeStamp);
    var requestUrl = prepareURLCar3()
    console.log(`Url is ${requestUrl}`)

    https.get(requestUrl, resp => {
        console.log(`response recieved with statusCode ${resp.statusCode}`);
        if(resp.statusCode == 200){
            console.log("successfully uploaded the data to telematics dashboard");
        } else {
            console.log("failed to load the data to telematics dashboard");
        }
        console.log(`response body ${resp}`);
    })
};

export default timerTrigger;
 
