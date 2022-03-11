import BaseModel from "../BaseMode";

export class Example extends BaseModel {
  // Table name is the only required property.
  public static tableName = 'example';

  public name!: string;
  // This object defines the relations to other models.
  // https://vincit.github.io/objection.js/guide/relations.html
  public static relationMappings = () => ({
    // specify relation with other modules
  })
}
