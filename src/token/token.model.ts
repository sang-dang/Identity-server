import { InstanceType, ModelType, prop, Typegoose } from 'typegoose';
import { SchemaOptions } from 'mongoose';

// const schemaOptions: SchemaOptions = {
//     timestamps: true,
//     toJSON: {
//         virtuals: true,
//         getters: true,
//     },
// };

export class Token extends Typegoose{
    @prop()
    email: string;

    @prop()
    accessToken: string;

    static get model(): ModelType<Token> {
        return new Token().getModelForClass(Token);
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<Token> {
        return new this.model();
    }
}
