export type UserDto = {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address: AddressDto;
  phone?: string;
  website?: string;
  company?: CompanyDto
}

export type AddressDto = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type CompanyDto = {
  name?: string;
  catchPhrase?: string;
  bs?: string;
}