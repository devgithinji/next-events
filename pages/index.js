import React from 'react';
import {getFeaturedEvents} from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import Head from "next/head";

const HomePage = ({events}) => {

    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                <meta name='description' content='Find a lot of events that allow you to evolve'/>
            </Head>
            <EventList items={events}/>
        </div>
    );
};

export default HomePage;

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}