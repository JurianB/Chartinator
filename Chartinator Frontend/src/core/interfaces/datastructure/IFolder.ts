import { IFile } from "./IFile";

export interface IFolder {
    name: string;
    files: IFile[];
}