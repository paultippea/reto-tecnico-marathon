export interface PersonResponse {
    _id: string;
    ruc: string;
    razon_social: string;
    estado: string;
    direccion: string;
    ubigeo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PersonRequest{
    tipo: string;
    ruc: string;
}