import { subFilterModel } from "./subFilterModel"

export interface filterModel {
    field:string
    value?:string
    operator:string
    logic?:string
    filters?:subFilterModel[]
}