import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true,
    collection: 'sch_users'
})
export class User {
    @Prop({ required: true, unique: true, trim: true })
    username: string

    @Prop({ required: true, trim: true })
    name: string

    @Prop({ required: true, trim: true })
    lastname: string

    @Prop({ required: true, unique: true, trim: true })
    email: string

    @Prop({ required: true, trim: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);