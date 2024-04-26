import { RolesAndClaimsModel } from "./RolesAndClaimsModel";

export interface getFromAuthWithClaimModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    rolesAndClaims:RolesAndClaimsModel[]
}