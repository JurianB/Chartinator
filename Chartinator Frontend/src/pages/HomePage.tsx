import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Page from '../components/layout/Page';
import { IDataStructureInfo } from '../core/interfaces/datastructure/IDataStructureInfo';
import WaitMessage from '../components/WaitMessage';
import { useChartsService } from '../services/ChartsService';
import ScrollBox from '../components/controls/ScrollBox';
import ListHeader from '../components/controls/ListHeader';
import { IChartDataInfo } from '../core/interfaces/chart/IChartDataInfo';
import Chart from '../components/charts/Chart';
import DataStructure from '../components/datastructure/DataStructure';
import { useDataStructureService } from '../services/DataStructureService';
import { ISelectedFile as ISelectedFile } from '../core/interfaces/datastructure/ISelectedFile';
import { ISelectedFileOptions } from '../core/interfaces/datastructure/ISelectedFileOption';
import { getValue } from '@mui/system';

export default function HomePage() {
    const [dataStructure, setDataStructure] = useState<IDataStructureInfo>();
    const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[]>([]);
    const [chartData, setChartData] = useState<IChartDataInfo>();
    const [loading, setLoading] = useState<boolean>(true);
    const chartsService = useChartsService();
    const dataStructureService = useDataStructureService();

    useEffect(() => {
        loadFolderStructure();
    }, []);

    const loadFolderStructure = () => {
        dataStructureService.LoadFolderStructureAsync([200])
            .then(response => {
                setDataStructure(response.data);
                setLoading(false);
            })
            .catch();
    }

    const handleFileChange = (filePath: string) => {
        if (dataStructure === undefined) {
            return;
        }

        const selected = selectedFiles;
        const findIndex = selectedFiles.findIndex(x => x.filePath === filePath);

        if (findIndex === -1) {
            const selection: ISelectedFile = {
                filePath: filePath,
                options: []
            }

            selected.push(selection);

            console.log(selected);
        }
        else {
            const fileToRemoveIndex = selectedFiles.findIndex(x => x.filePath === filePath);

            selected.splice(fileToRemoveIndex, 1);
        }

        setSelectedFiles([...selected]);
    }

    const onFileOptionChanged = (filePath: string, label: string, value: boolean) => {
        const selected = selectedFiles;
        const findIndex = selectedFiles.findIndex(x => x.filePath === filePath);

        const selectedFile = selected[findIndex];

        const optionsIndex = selectedFile.options.findIndex(x => x.label === label);

        if (optionsIndex === -1){
            const option:ISelectedFileOptions = {
                label: label,
                value: value,
            }

            selectedFile.options.push(option);
        } else {
            const optionToRemoveIndex = selectedFile.options.findIndex(x => x.label === label);

            selectedFile.options.splice(optionToRemoveIndex, 1);
        }
        
        setSelectedFiles([...selected]);
    }

    const onExecuteClicked = () => {
        setLoading(true);

        chartsService.ExecuteExcelsAsync(selectedFiles, [200])
            .then(response => {
                setChartData(response.data);
                setLoading(false);
            })
            .catch();
    }

    return (
        <Page title='Home - Chartinator'>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <WaitMessage show={loading} message={'Loading...'} />

                <Box sx={{ display: 'flex', width: '100%', marginTop: 2 }}>
                    <Box sx={{ width: 300 }}>
                        <ListHeader title='Data structure' />
                        <ScrollBox width={300} heightCorrection={180}>

                            {dataStructure !== undefined && (
                                <DataStructure data={dataStructure}
                                    selectedFiles={selectedFiles}
                                    onFileClicked={(filePath) => handleFileChange(filePath)}
                                    onFileOptionChanged={(filePath, label, value) => onFileOptionChanged(filePath, label, value)} />
                            )}

                            <Button
                                variant='contained'
                                size='large'
                                sx={{ marginTop: 'auto' }}
                                disabled={selectedFiles.length === 0}
                                onClick={onExecuteClicked}>Execute</Button>

                        </ScrollBox>
                    </Box>
                    <Box sx={{ width: 5 }} />


                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <ListHeader title='Chart data' />

                        {chartData !== undefined && (
                            <Chart data={chartData} />
                        )}
                    </Box>
                </Box>
            </Box>
        </Page>
    );
}
