"use client";
import { Toast } from '@capacitor/toast';
import Button from "@/components/button/button"
import styles from "./page.module.css"
import { useContext, useEffect, useRef, useState } from "react"
import { User } from "@/models/User";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { SqliteServiceContext, StorageServiceContext, platform } from "@/providers/dbProvider";
import Home from '@/components/home/home';
import Banner from '@/components/banner/banner';
export default function DBTestComponent() {
    const [db, setDb] = useState<SQLiteDBConnection | null>(null);
    const dbNameRef = useRef('');
    const ref = useRef(false);
    const isInitComplete = useRef(false);
    const sqliteServ = useContext(SqliteServiceContext);
    const storageServ = useContext(StorageServiceContext);
    const openDatabase = () => {
        try {
            const dbUsersName = storageServ.getDatabaseName();
            dbNameRef.current = dbUsersName;
            const version = storageServ.getDatabaseVersion();
            sqliteServ.openDatabase(dbUsersName, version, false).then((database) => {
                setDb(database);
                ref.current = true;
            });
        } catch (error) {
            const msg = `Error open database:: ${error}`;
            console.error(msg);
            Toast.show({
                text: `${msg}`,
                duration: 'long'
            });
        }
    }
    useEffect(() => {
        const initSubscription = storageServ.isInitCompleted.subscribe((value) => {
            isInitComplete.current = value;
            if (isInitComplete.current === true) {
                const dbUsersName = storageServ.getDatabaseName();
                if (ref.current === false) {
                    if (platform === "web") {
                        customElements.whenDefined('jeep-sqlite').then(() => {
                            openDatabase();
                        })
                            .catch((error) => {
                                const msg = `Error open database:: ${error}`;
                                console.log(`msg`);
                                Toast.show({
                                    text: `${msg}`,
                                    duration: 'long'
                                });
                            });

                    } else {
                        openDatabase();
                    }
                }
            }
        })
    }, []);
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState('');
    useEffect(() => {
        // Fetch users from the database using useQuerySQLite hook
        if (isInitComplete.current === true && db) {
            const fetchData = storageServ.getUsers();
            fetchData.then((fetchedUserData) => {
                setUsers(fetchedUserData);
            })
                .catch((error) => {
                    const msg = `Error fetching user data: ${error}`;
                    console.error(msg);
                    Toast.show({
                        text: `${msg}`,
                        duration: 'long'
                    });
                });
        }
    }, [db]);
    const addUser = async () => {
        if (db && newUser) {
            const isConn = await sqliteServ.isConnection(dbNameRef.current, false);
            let user: User = { name: newUser, id: 0, active: 1 };
            const lastId = await storageServ.addUser(user);
            user.id = lastId;
            setUsers([...users, user]);
        }
    }
    const deleteUser = async (userId: number) => {
        if (db && userId) {
            const isConn = await sqliteServ.isConnection(dbNameRef.current, false);
            await storageServ.deleteUserById(userId.toString());
            // Update the users state by filtering out the deleted user
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        }
    };
    return (
        <main className={styles.main}>
            <Banner>
                <h1 className="title">SQLite Test</h1>
            </Banner>
            <Home />
            <div className={"content"}>
                <div className={styles.section}>
                    <h2 className={styles.title}>Add User</h2>
                    <input className={styles.input} placeholder="Add a new user" onChange={(e) => setNewUser(e.target.value)} value={newUser} />
                    <Button type="blue" size="extended" onClick={addUser}>Add</Button>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.title}>Users List</h2>
                    {users.map((user, key) => (
                        <List user={user} key={key} action={deleteUser} />
                    ))}
                </div>
            </div>
        </main>
    )
}

function List({ user, action }: { user: User, action?: (id: number) => void }) {
    return (
        <div className={styles.list}>
            <span className={styles.data}>{user.name}</span>
            <span className={styles.action} onClick={() => action && action(user.id)} />
        </div>
    )
}