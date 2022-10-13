import { ISelectedFileOptions as ISelectedFileOption } from "./ISelectedFileOption";

export interface ISelectedFile {
    filePath: string;
    options: ISelectedFileOption[]
}