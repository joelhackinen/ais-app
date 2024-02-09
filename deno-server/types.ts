declare const brand: unique symbol;

type Brand<T, TBrand extends string> = T & {
  [brand]: TBrand;
};

export type TDate = Brand<string, "TDate">;
export type Latitude = Brand<number, "Latitude">;
export type Longitude = Brand<number, "Longitude">;
export type IMO = Brand<string, "IMO">;

export type AISEntry = {
  baseDateTime: TDate;
  lat: Latitude;
  lon: Longitude;
  imo: IMO;
};