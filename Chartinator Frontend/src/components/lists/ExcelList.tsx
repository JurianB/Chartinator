import { Box, List, ListItemButton, Typography } from '@mui/material';
import React from 'react'
import { IExcelListInfo } from '../../core/interfaces/system/excel/IExcelListInfo';

interface IExcelList {
    data: IExcelListInfo[] | undefined;
    selectedData: IExcelListInfo[];
    onChange: (id:string) => void;
}
export default function ExcelList(props: IExcelList) {
    return (
        <List sx={{ flexGrow: 1, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }} disablePadding>
            {props.data?.map((excel) => {
                return (
                    <ListItemButton
                        key={excel.fileName}
                        onClick={() => props.onChange(excel.fileName)}
                        divider
                        selected={props.selectedData.findIndex(x => x.fileName === excel.fileName) === -1 ? false : true}
                        sx={{ height: 50 }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Typography variant='body2' color='#11111' noWrap>
                                {excel.fileName}
                            </Typography>
                        </Box>
                    </ListItemButton>
                );
            })}
        </List>
    )
}
