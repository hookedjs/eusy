import validator from 'validator';

export class SanitizerBase {
  static fieldsCore: { [fieldName: string]: (any) => [any, string] } = {
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
  fields: { [fieldName: string]: (any) => [any, string] } = {};

  sanitizer = (data: { [fieldName: string]: any }, allowPartial: boolean = false) => {
    let errors: { [column: string]: string } = {};

    if (!allowPartial) {
      for (let fieldName of Object.keys(this.fields)) {
        if (data[fieldName] === undefined) errors[fieldName] = `${fieldName} is missing.`;
      }
    }

    let error = null;
    Object.entries(data).forEach(([fieldName, value]) => {
      [data[fieldName], error] = this.fields[fieldName](value);
      if (error) errors[fieldName] = error;
    });

    return [data, errors];
  };
}
