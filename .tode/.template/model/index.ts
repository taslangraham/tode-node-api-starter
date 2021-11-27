import BaseModel from "../BaseMode";

export class ModelClassName extends BaseModel {
  // Name of table that this model maps back to
  // Table name is the only required property.
  public static tableName = 'ENTER_TABLE_NAME';
  // Example property
  public foo!: string;

  // Add other tbale fields (columns) as properties to access them via the model

  // This object defines the relations to other models. The relationMappings
  // property can be a thunk to prevent circular dependencies.
  // READ MORE at https://vincit.github.io/objection.js/guide/relations.html
  public static relationMappings = () => ({
    // specify relation with other modules
  })

}
