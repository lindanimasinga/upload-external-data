import { Eventlist } from "./eventlist";
import { Backlink } from "./backlink.ts";
import { Seqinfo } from "./seqinfo";

export interface EventsResponse {
    alarmimage: string;
    date: string;
    events: string;
    eventlist: Eventlist[];
    backlink: Backlink[];
    seqinfo: Seqinfo;
    time: string;
    timestamp: string;
}

export default EventsResponse;