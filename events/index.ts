import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as http from 'http'
import request, * as sync from 'sync-request';
import EventsResponse from '../model/event-response'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const caremaIP = req.query.cam;
    const size = req.query.size;

    const eventsEndPoint = `http://${caremaIP}/control/event.jpg?output=alarmlist_extended&length=${size}&filter=*&sequence=head&eno=-1&searchbytime_start=0`;

    var response  = getCameraEvents(eventsEndPoint);

    context.res = {
        status: 200,
        body: response,
        headers: {'Content-Type': 'application/json'}
    }

};


function getCameraEvents(cameraUrl: string): EventsResponse {

    var eventsResponse;
    try {
        //const reposResponse = await fetch(cameraUrl);
        var response = request('GET', cameraUrl);
        //console.log(`response is ${reposResponse}`);
        eventsResponse = JSON.parse(response.getBody().toString())
    } catch (error) {
        console.log(error);
    }
    return eventsResponse;
}

export default httpTrigger;
