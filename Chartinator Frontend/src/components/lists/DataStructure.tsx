import { Box, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { IDataStructureInfo } from '../../core/interfaces/datastructure/IDataStructureInfo'
import { IFile } from '../../core/interfaces/datastructure/IFile';

interface IDataStructure {
    data: IDataStructureInfo;
    selectedFiles: IFile[];
    onChange: (id: string) => void;
}
export default function DataStructure(props: IDataStructure) {
    return (
        <List sx={{ flexGrow: 1, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }} disablePadding>
            {props.data.folders.map((folder) => {
                return (
                    <>
                        <ListItemButton
                            key={folder.name}
                            divider
                            sx={{ height: 50 }}
                            disabled={true}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography variant='body2' color='#11111' noWrap>
                                    {folder.name}
                                </Typography>

                            </Box>
                        </ListItemButton>
                        {folder.files.map((file) => {
                            return (
                                <Tooltip title={file.size} arrow placement='right'>
                                    <ListItemButton
                                        key={file.name}
                                        onClick={() => props.onChange(file.name)}
                                        divider
                                        selected={props.selectedFiles.findIndex(x => x.name === file.name) === -1 ? false : true}
                                        sx={{ height: 50 }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', paddingLeft: 2 }}>
                                            <Typography variant='body2' color='#11111' noWrap>
                                                {file.name}
                                            </Typography>
                                        </Box>
                                    </ListItemButton>
                                </Tooltip>

                            );
                        })}


                    </>
                );
            })}
        </List>
    )
}
