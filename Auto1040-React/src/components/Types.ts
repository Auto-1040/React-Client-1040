import { AddressFormData } from "./forms/AddressInformation"
import { DependentsFormData } from "./forms/DependentsInformation"
import { FilingFormData } from "./forms/FilingInformation"
import { PersonalFormData } from "./forms/PersonalInformation"
import { SpouseFormData } from "./forms/SpouseInformation"

export type User={
    id?:number,
    username?:String,
    email:String,
    password?: String,
}

export type UserInfo=FilingFormData|AddressFormData|PersonalFormData
|SpouseFormData|DependentsFormData;

export type userData= FilingFormData&AddressFormData&PersonalFormData
&SpouseFormData&DependentsFormData;

