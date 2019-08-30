const uuid = require('uuid/v4');
import { updatedDiff } from 'deep-object-diff';

import validator from 'validator';

export class BaseModel {
  db: any[] = [];

  sanitizersCore: { [fieldName: string]: (any) => [any, string] } = {
    id: value => {
      if (typeof value !== 'string') return [value, 'id is a non-string value'];
      else if (!validator.isUUID(value)) return [value, `id is invalid`];
      return [value, null];
    },
    createdAt: value => {
      if (typeof value !== 'number') return [value, 'createdAt is a non-string value'];
      return [value, null];
    },
    updatedAt: value => {
      if (typeof value !== 'number') return [value, 'createdAt is a non-string value'];
      return [value, null];
    }
  };
  sanitizers: { [fieldName: string]: (any) => [any, string] } = {};

  constructor() {
    this.sanitizers = {
      ...this.sanitizersCore,
      ...this.sanitizers
    };
  }

  sanitizer = (data: { [fieldName: string]: any }, allowPartial: boolean = false) => {
    let errors: { [column: string]: string } = {};

    if (!allowPartial) {
      for (let fieldName of Object.keys(this.sanitizers)) {
        if (data[fieldName] === undefined) errors[fieldName] = `${fieldName} is missing.`;
      }
    }

    let error = null;
    Object.entries(data).forEach(([fieldName, value]) => {
      [data[fieldName], error] = this.sanitizers[fieldName](value);
      if (error) errors[fieldName] = error;
    });

    return [data, errors];
  };

  create = async (data: { [fieldName: string]: any }) => {
    console.dir(data);
    const now = Date.now();
    const [sanitized, errors] = this.sanitizer({
      ...data,
      id: uuid(),
      createdAt: now,
      updatedAt: now
    });
    if (Object.keys(errors).length) return { errors };

    this.db.push(sanitized);
    return { data: sanitized };
  };

  read = async ({ id }) => {
    let row = this.db.find(row => row.id === id);
    if (!row) return { errors: { id: `id Not Found: ${id}` } };
    return { data: row };
  };

  update = async ({ id, ...updates }: { id: string; data: { [fieldName: string]: any } }) => {
    let rowIndex = this.db.findIndex(row => row.id === id);
    if (rowIndex === -1) return { errors: { id: `id Not Found: ${id}` } };

    let before = this.db[rowIndex];

    const [sanitized, errors] = this.sanitizer(
      updatedDiff(before, { ...before, ...updates }),
      true
    );
    if (Object.keys(errors).length) return { errors };

    this.db[rowIndex] = {
      ...before,
      ...sanitized,
      createdAt: before.createdAt, // ensure that this never changes
      updatedAt: Date.now()
    };
    return { data: this.db[rowIndex] };
  };

  delete = ({ id }) => {
    let rowIndex = this.db.findIndex(row => row.id === id);
    if (rowIndex === -1) return { errors: { id: `id Not Found: ${id}` } };
    this.db.splice(rowIndex, 1);
    return { error: false };
  };

  query = (filters: { [fieldName: string]: any }) => {
    let rows = this.db.filter(row => {
      let match = true;
      for (let [column, value] of Object.entries(filters)) {
        if (row[column] !== value) match = false;
      }
      return match;
    });
    return { data: rows };
  };
}
