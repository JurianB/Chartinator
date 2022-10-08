import Exchange from '../core/Exchange';
import { IResponse } from '../core/interfaces/system/IResponse';
import { IStateContext } from '../core/interfaces/system/IStateContext';
import { useSession } from '../core/SessionProvider';

export default class DataStructureService {
    context: IStateContext;

    constructor(context: IStateContext) {
        this.context = context;
    }

    async LoadFolderStructureAsync(codes: number[]) {
        let api = `/api/datastructure`;
        console.log('Exchange: LoadFolderStructureAsync');

        return (await Exchange.getApiData(this.context, api, codes)) as IResponse;
    }
}

export function useDataStructureService() {
    const context = useSession();
    return new DataStructureService(context);
}
