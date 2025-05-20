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