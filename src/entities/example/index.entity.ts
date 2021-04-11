import { BaseEntity, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from "@mikro-orm/mongodb";
import { Entity, PrimaryKey, Property } from "mikro-orm";

// This is an example of a MongoDb entity class
@Entity()
//  "id" represents the primary key
export class ExampleEntity {

    public get id() {
        return this._serializedId;
    }

    @Property()
    public title!: string;

    @PrimaryKey()
    private _id!: ObjectId;

    @SerializedPrimaryKey()
    // won't be saved in the database
    // used to make querying by id much simplier
    // as qeuring by _id will require a conversion from string to ObjectId
    private _serializedId!: string;

}
