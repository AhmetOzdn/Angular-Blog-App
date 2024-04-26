import { filterModel } from "./filterModel";
import { sortModel } from "./sortModel";

export interface dynamicQueryModel {
    sort?:sortModel[]
    filter?:filterModel[]
}