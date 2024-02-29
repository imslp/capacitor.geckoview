"use client";
import DBProvider from "@/providers/dbProvider";
import Jeep from '@/providers/jeep';
import DBTestComponent from './component';
export default function DBTest() {
    return (
        <Jeep>
            <DBProvider>
                <DBTestComponent />
            </DBProvider>
        </Jeep>
    )
}