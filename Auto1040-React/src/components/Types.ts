import { AddressFormData } from "./Forms/AddressInformation"
import { DependentsFormData } from "./Forms/DependentsInformation"
import { FilingFormData } from "./Forms/FilingInformation"
import { PersonalFormData } from "./Forms/PersonalInformation"
import { SpouseFormData } from "./Forms/SpouseInformation"

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

