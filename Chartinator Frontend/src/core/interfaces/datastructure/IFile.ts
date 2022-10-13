import { IFileOptions } from "./IFileOptions";

export interface IFile {
    name: string;
    path: string;
    size: string;
    type: number;
    options: IFileOptions[];
}