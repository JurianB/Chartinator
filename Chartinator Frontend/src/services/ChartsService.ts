import Exchange from '../core/Exchange';
import { ISelectedFile } from '../core/interfaces/datastructure/ISelectedFile';
import { IResponse } from '../core/interfaces/system/IResponse';
import { IStateContext } from '../core/interfaces/system/IStateContext';
import { useSession } from '../core/SessionProvider';

export default class ChartsService {
    context: IStateContext;

    constructor(context: IStateContext) {
        this.context = context;
    }

    async LoadFolderStructureAsync(codes: number[]) {
        let api = `/api/charts/excel`;
        console.log('Exchange: ExcelsAsync');

        return (await Exchange.getApiData(this.context, api, codes)) as IResponse;
    }

    
    async ExecuteExcelsAsync(body:ISelectedFile[], codes: number[]) {
        let api = `/api/charts`;
        console.log('Exchange: ExecuteExcelsAsync');

        return (await Exchange.postApiData(this.context, api, body, codes)) as IResponse;
    }

}

export function useChartsService() {
    const context = useSession();
    return new ChartsService(context);
}
