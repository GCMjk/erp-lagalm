import { FC, PropsWithChildren } from 'react';
import Head from 'next/head'

import { Typography } from "@mui/material"
import { Header, Sidebar } from '@components/ui'

interface Props {
    title: string;
    pageDescription: string;
}

export const ErpLayout: FC<PropsWithChildren<Props>> = ({ title, pageDescription, children }) => {
    return (
        <>
            <Head>
                <title>{title} - Lagalm</title>
                <meta name="description" content={pageDescription} />
            </Head>

            <Header />

            <Sidebar />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {title && (<Typography variant="h1" component="h1">{title}</Typography>)}
                {children}
            </main>
        </>
    )
}