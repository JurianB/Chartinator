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
        if (dataStructure === undefined){
            return;
        }

        dataStructure.folders.forEach(folder => {
            folder.files.forEach(file => {
                if (file.path === filePath){
                    file.selected = !file.selected
                }
            });
        });

        setDataStructure({...dataStructure});
    }

    const onFileOptionChanged = (filePath: string, label: string, value: boolean) => {
        if (dataStructure === undefined){
            return;
        }

        dataStructure.folders.forEach(folder => {
            folder.files.forEach(file => {
                if (file.path === filePath){
                    file.options.forEach(option => {
                        if (option.label === label){
                            option.checked = !option.checked;
                        }
                    });
                }
            });
        });

        console.log(dataStructure);

        setDataStructure({...dataStructure});

    }

    const onExecuteClicked = () => {
        setLoading(true);

        if (dataStructure === undefined){
            return;
        }

        chartsService.ExecuteExcelsAsync(dataStructure, [200])
            .then(response => {
                setChartData(response.data);
                setLoading(false);
            })
            .catch();
    }

    const isExecutionButtonDisabled = () => {
        return false;
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
                                    onFileClicked={(filePath) => handleFileChange(filePath)}
                                    onFileOptionChanged={(filePath, label, value) => onFileOptionChanged(filePath, label, value)} />
                            )}

                            <Button
                                variant='contained'
                                size='large'
                                sx={{ marginTop: 'auto' }}
                                disabled={isExecutionButtonDisabled()}
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
