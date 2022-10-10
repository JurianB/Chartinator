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

export default function HomePage() {
    const [dataStructure, setDataStructure] = useState<IDataStructureInfo>();
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
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
        console.log('clicked on file:' + filePath)
        if (dataStructure === undefined) {
            return;
        }

        const selected = selectedFiles;
        

        const findIndex = selectedFiles.findIndex(x => x === filePath);

        if (findIndex === -1) {
            selected.push(filePath);
        }
        else {
            const fileToRemoveIndex = selectedFiles.findIndex(x => x === filePath);

            selected.splice(fileToRemoveIndex, 1);
        }

        setSelectedFiles([...selected]);

        console.log(selectedFiles);
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
                                <DataStructure data={dataStructure} selectedFiles={selectedFiles} onChange={(id) => handleFileChange(id)} />
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
