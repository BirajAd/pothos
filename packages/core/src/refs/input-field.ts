import type SchemaBuilder from '../builder';
import { PothosSchemaError } from '../errors';
import { inputFieldShapeKey, PothosFieldConfig, PothosTypeConfig, SchemaTypes } from '../types';
import { inputTypeFromParam } from '../utils';

export default class InputFieldRef<Types extends SchemaTypes, T = unknown> {
  builder: SchemaBuilder<Types>;

  kind = 'InputObject' as const;

  fieldName?: string;

  options: PothosSchemaTypes.InputObjectFieldOptions<Types> | null;

  [inputFieldShapeKey]!: T;

  constructor(
    builder: SchemaBuilder<Types>,

    options: PothosSchemaTypes.InputObjectFieldOptions<Types> | null = null,
  ) {
    this.builder = builder;

    this.options = options;
  }

  getConfig(name: string, typeConfig: PothosTypeConfig): PothosFieldConfig<Types> {
    if (!this.options) {
      throw new PothosSchemaError(`Field ${typeConfig.name}.${name} has not been implemented`);
    }

    return {
      name,
      parentField: undefined,
      kind: this.kind,
      graphqlKind: this.kind,
      parentType: typeConfig.name,
      type: inputTypeFromParam<Types>(
        this.options.type,
        this.builder.configStore,
        this.options.required ?? this.builder.defaultInputFieldRequiredness,
      ),
      pothosOptions: this.options,
      description: this.options.description,
      deprecationReason: this.options.deprecationReason,
      defaultValue: this.options.defaultValue,
      extensions: this.options.extensions,
    };
  }
}
