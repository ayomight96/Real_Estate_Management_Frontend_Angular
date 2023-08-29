import { Ipropertybase } from './ipropertybase';

export class Property implements Ipropertybase {
  id!: number;
  sellRent!: number | null;
  name!: string;
  propertyType!: string;
  bhk?: number | null;
  furnishingType?: string;
  price?: number | null;
  builtArea?: number | null;
  carpetArea?: number | null;
  address!: string;
  address2?: string;
  city?: string;
  floorNo?: string;
  totalFloor?: string;
  readyToMove?: number;
  ageOfProperty?: string;
  mainEntrance?: string;
  security?: number;
  gated?: number;
  maintenance?: number;
  possessionOn?: string;
  image?: string;
  description?: string;
  postedOn!: string;
  postedBy!: number;
}
