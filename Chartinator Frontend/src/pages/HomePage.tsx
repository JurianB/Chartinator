import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Page from '../components/layout/Page';
import { IExcelListInfo } from '../core/interfaces/system/excel/IExcelListInfo';
import WaitMessage from '../components/WaitMessage';
import { useChartsService } from '../services/ChartsService';
import ExcelList from '../components/lists/ExcelList';
import ScrollBox from '../components/controls/ScrollBox';
import ListHeader from '../components/controls/ListHeader';
import { IChartDataInfo } from '../core/interfaces/chart/IChartDataInfo';
import Chart from '../components/charts/Chart';

export default function HomePage() {
    const [excels, setExcels] = useState<IExcelListInfo[]>();
    const [selectedExcels, setSelectedExcels] = useState<IExcelListInfo[]>([]);
    const [chartData, setChartData] = useState<IChartDataInfo>();
    const [loading, setLoading] = useState<boolean>(true);
    const service = useChartsService();

    useEffect(() => {
        loadExcels();
    }, []);

    const loadExcels = () => {
        service.LoadExcelsAsync([200])
            .then(response => {
                setExcels(response.data);
                setLoading(false);
            })
            .catch();
    }

    const handleExcelChange = (name: string) => {
        if (excels === undefined) {
            return;
        }

        const findIndex = selectedExcels.findIndex(x => x.fileName === name);

        if (findIndex === -1) {
            const excelIndex = excels?.findIndex(x => x.fileName === name);

            setSelectedExcels([...selectedExcels, excels[excelIndex]])

            return;
        } else {
            const excelToRemoveIndex = selectedExcels.findIndex(x => x.fileName === name);

            const temp = [...selectedExcels];

            temp.splice(excelToRemoveIndex, 1);

            setSelectedExcels(temp);
        }
    }

    const onExecuteClicked = () => {
        setLoading(true);

        service.ExecuteExcelsAsync(selectedExcels, [200])
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
                        <ListHeader title='Excel files' />
                        <ScrollBox width={300} heightCorrection={180}>

                            {excels !== undefined && (
                                <ExcelList data={excels} selectedData={selectedExcels} onChange={(id) => handleExcelChange(id)} />
                            )}

                            <Button
                                variant='contained'
                                size='large'
                                sx={{ marginTop: 'auto' }}
                                disabled={selectedExcels.length === 0}
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
