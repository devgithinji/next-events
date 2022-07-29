import React from 'react';
import {useRouter} from "next/router";
import {getEventById} from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetail = () => {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        )
    }
    const {title, date, location, image} = event;
    return (
        <>
            <EventSummary title={title}/>
            <EventLogistics date={date} address={location} image={image} imageAlt={title}/>
            <EventContent>{event.description}</EventContent>
        </>
    );
};

export default EventDetail;