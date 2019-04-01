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
        "en-GB": "External links",
        "de-DE": "Externe Links"
      },
      "value": [
        {
          "href": {
            "en-GB": "http://admin:meinsm@sgttdemo.ddns.net:10001",
            "de-DE": "http://admin:meinsm@sgttdemo.ddns.net:10001"
          },
          "title": {
            "en-GB": "Live Video Stream",
            "de-DE": "In Truck Spy App öffnen"
          },
          "description": {
            "en-GB": "By clicking you will be redirected to the Live Video Stream.",
            "de-DE": "Dieser Link öffnet die Truck Spy Anwendung"
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
            "en-GB": "Battery status",
            "de-DE": "Batteriestatus"
          },
          "value": {
            "en-GB": "95 %"
          },
          "icon": 13
        },
        {
          "name": {
            "en-GB": "Fuel level",
            "de-DE": "Tankstand"
          },
          "value": {
            "en-GB": "104.5 l",
            "de-DE": "104,5 l"
          },
          "icon": 35
        }
      ],
      [
        {
          "name": {
            "en-GB": "Ambient temperature",
            "de-DE": "Umgebungstemparatur"
          },
          "value": {
            "en-GB": "23° C"
          },
          "icon": 7
        },
        {
          "name": {
            "en-GB": "Relative humidity",
            "de-DE": "Relative Luftfeuchtigkeit"
          },
          "icon": 27
        }
      ],
      [
        {
          "name": {
            "en-GB": "Cab door left",
            "de-DE": "Führerhaustür links"
          },
          "value": {
            "en-GB": "open",
            "de-DE": "geöffnet"
          },
          "icon": 4
        },
        {
          "name": {
            "en-GB": "Cab door right",
            "de-DE": "Führerhaustür rechts"
          },
          "value": {
            "en-GB": "closed",
            "de-DE": "geschlossen"
          },
          "icon": 23
        }
      ],
      [
        {
          "name": {
            "en-GB": "Trailer door 1",
            "de-DE": "Anhänger Tür 1"
          },
          "value": {
            "en-GB": "locked",
            "de-DE": "verschlossen"
          },
          "icon": 23
        }
      ]
    ]
  }

 const url = "https://csv.telematics.tomtom.com/extern"; 

 function prepareURL(): string {

    var data = encodeURI(JSON.stringify(jsonData))
    var apikey = "d1fa7e14-4bf9-48a0-a193-bcabd0d58e00"
    var action = "setExternalObjectData"
    var outputformat = "json"
    var objectuid = "1-390874-721755F439"
    var password = "Csd0148()1"
    var username = "Lindani"
    var account = "chickens-cc"
    var lang = "en"

    return `${url}?${lang}&${account}&${username}&${password}&${objectuid}&${outputformat}&${action}&${apikey}&${data}`
 }

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    if(myTimer.isPastDue)
    {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);

    https.get(prepareURL(), resp => {
        if(resp.statusCode){
            console.log("successful")
        } else {
            console.log("failed")
        }
    })
};

export default timerTrigger;