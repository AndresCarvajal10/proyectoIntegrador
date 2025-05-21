export interface ListAppointment {
    responseCode: string;
    responseDesc: string;
    responseObj: ResponseObj;
}

interface ResponseObj {
    agendaCitaId: number;
    fechaInicio: string;
    horaInicio: string;
    estado: string;
    descripcion: string;
}

export interface DataLoginResponse {
    responseCode: string;
    responseDesc: string;
    responseObj: ResponseObj;
}

interface ResponseObj {
    idClient: string;
    name: string;
    lastName: string;
    addres: string;
    phone: string;
    email: string;
    phoemailne: string;
}

export interface CreateAppointmentResponse {
    responseCode: string;
    responseDesc: string;
    responseObj: boolean;
}

