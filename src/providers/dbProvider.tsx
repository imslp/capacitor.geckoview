"use client"
import { Capacitor } from "@capacitor/core";
import SqliteService from '../services/sqliteService';
import DbVersionService from '../services/dbVersionService';
import StorageService from '../services/storageService';

import React, { ReactNode, useEffect } from "react";
import AppInitializer from "./AppInitializer";

export const platform = Capacitor.getPlatform();

// Singleton Services
export const SqliteServiceContext = React.createContext(SqliteService);
export const DbVersionServiceContext = React.createContext(DbVersionService);
export const StorageServiceContext = React.createContext(new StorageService(SqliteService, DbVersionService));

export default function DBProvider({ children }: { children: ReactNode }) {
    return (
        <SqliteServiceContext.Provider value={SqliteService}>
            <DbVersionServiceContext.Provider value={DbVersionService}>
                <StorageServiceContext.Provider value={new StorageService(SqliteService, DbVersionService)}>
                    <AppInitializer>
                        {children}
                    </AppInitializer>
                </StorageServiceContext.Provider>
            </DbVersionServiceContext.Provider>
        </SqliteServiceContext.Provider>
    )
}
