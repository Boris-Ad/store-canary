export interface IGeoResponse {
    response: Response;
  }
  interface Response {
    GeoObjectCollection: GeoObjectCollection;
  }
  interface GeoObjectCollection {
    metaDataProperty: MetaDataProperty;
    featureMember: FeatureMember[];
  }
  interface FeatureMember {
    GeoObject: GeoObject;
  }
  interface GeoObject {
    metaDataProperty: MetaDataProperty2;
    description: string;
    name: string;
    boundedBy: BoundedBy;
    Point: Point;
  }
  interface Point {
    pos: string;
  }
  interface BoundedBy {
    Envelope: Envelope;
  }
  interface Envelope {
    lowerCorner: string;
    upperCorner: string;
  }
  interface MetaDataProperty2 {
    GeocoderMetaData: GeocoderMetaData;
  }
  interface GeocoderMetaData {
    kind: string;
    text: string;
    precision: string;
    Address: Address;
    AddressDetails: AddressDetails;
  }
  interface AddressDetails {
    Country: Country;
  }
  interface Country {
    AddressLine: string;
    CountryNameCode: string;
    CountryName: string;
    AdministrativeArea: AdministrativeArea;
  }
  interface AdministrativeArea {
    AdministrativeAreaName: string;
    Locality: Locality;
  }
  interface Locality {
    LocalityName: string;
    Thoroughfare: Thoroughfare;
  }
  interface Thoroughfare {
    ThoroughfareName: string;
    Premise: Premise;
  }
  interface Premise {
    PremiseNumber: string;
    PostalCode: PostalCode;
  }
  interface PostalCode {
    PostalCodeNumber: string;
  }
  interface Address {
    country_code: string;
    postal_code: string;
    formatted: string;
    Components: Component[];
  }
  interface Component {
    kind: string;
    name: string;
  }
  interface MetaDataProperty {
    GeocoderResponseMetaData: GeocoderResponseMetaData;
  }
  interface GeocoderResponseMetaData {
    request: string;
    found: string;
    results: string;
  }