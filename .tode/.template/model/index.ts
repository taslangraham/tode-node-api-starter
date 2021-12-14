import BaseModel from "../BaseMode";

export class ModelClassName extends BaseModel {
  // Name of table that this model maps back to
  // Table name is the only required property.
  public static tableName = 'ENTER_TABLE_NAME';
  // Example property
  public foo!: string;

  // Add other table fields (columns) as properties to access them via the model

  //  Define the relations to other models.
  // READ MORE at https://vincit.github.io/objection.js/guide/relations.html
  public static relationMappings = () => ({
    // specify relation with other modules
  })

}
