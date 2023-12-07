import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true,
    collection: 'sch_person'
})
export class Person {
    @Prop({ trim: true })
    ruc: string;

    @Prop({ trim: true })
    razon_social: string;

    @Prop({ trim: true })
    estado: string;

    @Prop({ trim: true })
    direccion: string;

    @Prop({ trim: true })
    ubigeo: string;

    @Prop({ trim: true })
    departamento: string;

    @Prop({ trim: true })
    provincia: string;

    @Prop({ trim: true })
    distrito: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);