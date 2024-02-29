"use client"

import { ReactNode, useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';

const platform = Capacitor.getPlatform();

export default function Jeep({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (platform === 'web' && !customElements.get('jeep-sqlite')) {
            customElements.define('jeep-sqlite', JeepSqlite);
            const jeepEl = document.createElement("jeep-sqlite");
            document.body.appendChild(jeepEl);
            customElements.whenDefined('jeep-sqlite').then(() => {
                console.log('ready...');
            });
        }
    }, []);
    return (
        <>
            {children}
        </>
    )
}