import { RolesAndClaimsModel } from "./RolesAndClaimsModel";

export interface UserDetailModel {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    rolesAndClaims : RolesAndClaimsModel[]
}