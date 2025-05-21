export interface ResponseDataGeneric {
  responseCode: string;
  responseDesc: string;
  responseObj:  ResponseObj;
}

export interface ResponseObj {
  selectorEstadoList:    SelectorEstadoList[];
  selectorVeterinarians: SelectorVeterinarian[];
  selectorRazas:         SelectorRaza[];
  selectorRols:          SelectorRol[];
}

export interface SelectorEstadoList {
  idEstado:    number;
  descripcion: string;
}

export interface SelectorRaza {
  idRaza:   number;
  tipoRaza: string;
}

export interface SelectorRol {
  idRole:          number;
  descripcionRole: string;
}

export interface SelectorVeterinarian {
  idVeterinarian: number;
  nombre:         string;
}
