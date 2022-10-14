import { IFileOptions } from "./IFileOptions";

export interface IFile {
    name: string;
    path: string;
    size: string;
    type: number;
    selected: boolean;
    options: IFileOptions[];
}