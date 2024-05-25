export interface IPerson {
  id: string
  firstName: string
  lastName: string
  document: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  photoUrl: string
  address: IAddress
}

export interface IAddress {
  zipCode: string
  street: string
  extraLine: string
  neighborhood: string
  city: string
  state: string
}

