import { FC, PropsWithChildren } from 'react';
import Head from 'next/head'

import { Navbar, Footer, Sidenav } from '@components/ui'

interface Props {
    title: string;
    pageDescription: string;
}

export const WebLayout: FC<PropsWithChildren<Props>> = ({ title, pageDescription, children }) => {
    return (
        <>
            <Head>
                <title>{title} - Lagalm</title>
                <meta name="description" content={pageDescription} />

                <meta name='og:title' content={title} />
                <meta name='og:description' content={pageDescription} />
            </Head>

            <Navbar />

            <Sidenav />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <Footer />
        </>
    )
}