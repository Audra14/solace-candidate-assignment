export interface Advocate {
    firstName: string, 
    lastName: string, 
    city: string, 
    degree: string, 
    specialties: string[], 
    yearsOfExperience: number, 
    phoneNumber: string
}

export interface AdvocateDisplay {
    advocate: string, 
    city: string, 
    specialties: string[], 
    yearsOfExperience: number, 
    phoneNumber: string 
}