export interface Ipropertybase {
  id: number;
  sellRent: number|null;
  name: string;
  propertyType: string;
  furnishingType?: string;
  price?: number|null;
  bhk?: number|null;
  builtArea?: number|null;
  city?: string;
  readyToMove?: number;
  image?: string;
}
