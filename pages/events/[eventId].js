import React from 'react';
import {getEventById, getFeaturedEvents} from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Head from "next/head";

const EventDetail = ({event}) => {

    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        )
    }

    const {title, date, location, image} = event;

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description}/>
            </Head>
            <EventSummary title={title}/>
            <EventLogistics date={date} address={location} image={image} imageAlt={title}/>
            <EventContent>{event.description}</EventContent>
        </>
    );
};

export default EventDetail;

export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    if (!event) {
        return {notFound: true}
    }

    return {
        props: {
            event
        },
        revalidate: 30
    }
}

export const getStaticPaths = async (context) => {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({params: {eventId: event.id}}))
    return {
        paths,
        fallback: 'blocking'
    }
}