export interface ResponseListPetties {
  responseCode: string;
  responseDesc: string;
  responseObj:  ResponseObj[];
}

export interface ResponseObj {
  idMascota:     number;
  codigo:        string;
  nombreMascota: string;
  tipoRaza:      string;
  edad:          number;
  genero:        string;
}
