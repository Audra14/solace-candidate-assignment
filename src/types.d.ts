import { advocates } from "./db/schema"

export type Advocate = {
    firstName: string, 
    lastName: string, 
    city: string, 
    degree: string, 
    specialties: string[], 
    yearsOfExperience: number, 
    phoneNumber: string
}

export type AdvocateDisplay = {
    advocate: string, 
    city: string, 
    specialties: string[], 
    yearsOfExperience: number, 
    phoneNumber: string 
}