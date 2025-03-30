import { AddressFormData } from "./forms/AddressInformation"
import { DependentsFormData } from "./forms/DependentsInformation"
import { PersonalFormData } from "./forms/PersonalInformation"
import { SpouseFormData } from "./forms/SpouseInformation"

export type User={
    id?:number,
    username?:String,
    email:String,
    password?: String,
}

export type UserInfo=AddressFormData|PersonalFormData
|SpouseFormData|DependentsFormData;

export type userData= AddressFormData&PersonalFormData
&SpouseFormData&DependentsFormData;

