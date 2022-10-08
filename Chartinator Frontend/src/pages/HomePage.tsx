import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Page from '../components/layout/Page';
import { IDataStructureInfo } from '../core/interfaces/datastructure/IDataStructureInfo';
import WaitMessage from '../components/WaitMessage';
import { useChartsService } from '../services/ChartsService';
import ExcelList from '../components/lists/ExcelList';
import ScrollBox from '../components/controls/ScrollBox';
import ListHeader from '../components/controls/ListHeader';
import { IChartDataInfo } from '../core/interfaces/chart/IChartDataInfo';
import Chart from '../components/charts/Chart';
import { IFile } from '../core/interfaces/datastructure/IFile';
import DataStructure from '../components/lists/DataStructure';
import { useDataStructureService } from '../services/DataStructureService';

export default function HomePage() {
    const [dataStructure, setDataStructure] = useState<IDataStructureInfo>();
    const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);
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

    const handleFileChange = (name: string) => {
        // if (dataStructure === undefined) {
        //     return;
        // }

        // const findIndex = selectedFiles.findIndex(x => x.name === name);

        // if (findIndex === -1) {
        //     const fileIndex = dataStructure?.folders.map(folder => folder.files).findIndex(x => x.name === name);

        //     setSelectedFiles([...selectedFiles, dataStructure[fileIndex]])

        //     return;
        // } else {
        //     const excelToRemoveIndex = selectedFiles.findIndex(x => x.fileName === name);

        //     const temp = [...selectedFiles];

        //     temp.splice(excelToRemoveIndex, 1);

        //     setSelectedFiles(temp);
        // }
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
                                <DataStructure data={dataStructure} selectedFiles={selectedFiles} onChange={(id) => handleFileChange(id)}/>
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
