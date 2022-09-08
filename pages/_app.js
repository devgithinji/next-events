import '../styles/globals.css'
import Layout from "../components/layout/layout";
import Head from "next/head";
import React from "react";

function MyApp({Component, pageProps}) {
    return (
        <Layout>
            <Head>
                <title>Next Events</title>
                <meta name='description' content='NextJS Events'/>
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
