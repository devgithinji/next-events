import React from 'react';
import EventList from "../../components/events/event-list";
import {getAllEvents} from "../../helpers/api-utils";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";

const EventsPage = ({events}) => {

    const router = useRouter();

    const filterEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }

    return (
        <>
            <EventsSearch onSearch={filterEventsHandler}/>
            <EventList items={events}/>
        </>
    );
};

export default EventsPage;

export const getStaticProps = async () => {
    const events = await getAllEvents();
    return {
        props: {
            events
        },
        revalidate: 60
    }
}