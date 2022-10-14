import { List } from '@mui/material';
import React from 'react'
import { IDataStructureInfo } from '../../core/interfaces/datastructure/IDataStructureInfo'
import FolderStructure from './FolderStructure';

interface IDataStructure {
    data: IDataStructureInfo;
    onFileClicked: (filePath: string) => void
    onFileOptionChanged: (filePath: string, label: string, checked: boolean) => void;
}
export default function DataStructure(props: IDataStructure) {

    return (
        <List sx={{ flexGrow: 1, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }} disablePadding>
            {props.data.folders.map((folder) => {
                return (
                    <FolderStructure
                        key={folder.name}
                        folder={folder}
                        onFileClicked={props.onFileClicked}
                        onFileOptionChanged={props.onFileOptionChanged}
                        data={props.data}
                    />

                );
            })}
        </List>
    )
}
