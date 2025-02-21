import { ObjectRef } from '@pothos/core';

export const relayIDShapeKey = Symbol.for('Pothos.relayIDShapeKey');

export class NodeRef<T, P = T, IDShape = string> extends ObjectRef<T, P> {
  [relayIDShapeKey]!: IDShape;
  parseId: ((id: string, ctx: object) => IDShape) | undefined;

  constructor(
    name: string,
    options: {
      parseId?: (id: string, ctx: object) => IDShape;
    },
  ) {
    super(name);
    this.parseId = options.parseId;
  }
}
