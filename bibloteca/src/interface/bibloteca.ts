export interface ILibro {  
    id:number;           
    nombre: string;          
    descripcion: string; 
    categoria:string;
    cantidad:number    ;
    imagen_url: string;      
    autor: string;         
    disponible: boolean;     
}

export interface Iprestamo{
    usuario_id:number;
    libro_id:number;
    fecha_prestamo:string;
    fecha_devolucion:string;
    estado:string;
}
export interface IlisPrestado{
    usuario_nombre:string;
    libro_nombre:string;
    fecha_prestamo:string;
    fecha_devolucion:string;

}