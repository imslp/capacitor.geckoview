"use client"
import Button from "@/components/button/button";
import styles from './files.module.css';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useEffect, useState } from "react";
import { Toast } from '@capacitor/toast';
import Home from "@/components/home/home";
import Banner from "@/components/banner/banner";

const saveFile = async (data: string) => {
    await Filesystem.writeFile({
        path: 'secrets/text.txt',
        data: data,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
};

const readFile = async () => {
    const content = await Filesystem.readFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
    return content.data;
};

const createFolder = async () => {
    const folderPath = 'secrets';
    console.log('creating folder...');
    try {
        await Filesystem.mkdir({
            path: folderPath,
            directory: Directory.Documents,
            recursive: false,
        });
        Toast.show({
            text: 'The secrets folder has been created successfully!',
        });
    } catch (error) {
        console.error('Error creating secrets folder:', error);
        Toast.show({
            text: 'Failed to create secrets folder',
        });
    }
};

const checkPathExists = async (path: string, directory?: Directory) => {
    try {
        const result = await Filesystem.stat({
            path: path,
            directory: directory || undefined,
        });

        return result.type === 'file' || result.type === 'directory';
    } catch (error) {
        return false;
    }
};

export default function Files() {
    const [data, setData] = useState('');
    useEffect(() => {
        checkPathExists('secrets', Directory.Documents).then(flag => {
            if (!flag) {
                createFolder();
            }
        });
    }, [])
    return (
        <main className={styles.main}>
            <Banner>
                <h1 className={'title'}>Files Test</h1>
            </Banner>
            <Home />
            <div className={"content"}>
                <Button size="extended" type="blue" onClick={() => {
                    readFile().then((content: any) => {
                        if (content) {
                            setData(content.toString());
                        }
                    }).catch(() => {
                        Toast.show({
                            text: 'Failed to read the file.'
                        });
                    })
                }}>
                    Open File
                </Button>
                <textarea className={styles.textarea} value={data} onChange={(e) => {
                    setData(e.target.value);
                }} />
                <Button size="extended" onClick={() => {
                    saveFile(data).then(() => {
                        Toast.show({
                            text: 'The file has been saved successfully!',
                        });
                    }).catch((err) => {
                        Toast.show({
                            text: 'Something went wrong.'
                        });
                    })
                }}>
                    Save
                </Button>
            </div>
        </main>
    )
}