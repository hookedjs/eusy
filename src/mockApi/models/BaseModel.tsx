const uuid = require('uuid/v4');
import { updatedDiff } from 'deep-object-diff';
import lunr from 'lunr';

import validator from 'validator';

export class BaseModel {
  db: any[] = [];
  searchService: lunr.Index;
  searchFields: { name: string; boost: number }[] = [];

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

  // constructor() {
  //   const that = this;
  //   this.searchService = lunr(function () {
  //     this.ref('id');
  //     that.searchFields.map(sf => this.field(sf.name, {boost: sf.boost}));
  //     that.db.forEach(doc => this.add(doc), this)
  //   });
  // }

  // constructor() {
  //   console.dir(this.searchFields);
  //   const that = this;
  //   this.searchService = lunr(function () {
  //     this.ref('id');
  //     that.searchFields.map(sf => this.field(sf.name, {boost: sf.boost}));
  //     that.db.forEach(doc => this.add(doc), this)
  //   });
  // }

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
    this.initSearchService();
    const now = Date.now();
    const [sanitized, errors] = this.sanitizer({
      ...data,
      id: uuid(),
      createdAt: now,
      updatedAt: now
    });
    if (Object.keys(errors).length) return { errors };

    this.db.push(sanitized);
    this.searchService.add(sanitized);
    return { data: sanitized };
  };

  read = async ({ id }) => {
    let row = this.db.find(row => row.id === id);
    if (!row) return { errors: { id: `id Not Found: ${id}` } };
    return { data: row };
  };

  update = async ({ id, ...updates }: { id: string; data: { [fieldName: string]: any } }) => {
    this.initSearchService();
    let rowIndex = this.db.findIndex(row => row.id === id);
    if (rowIndex === -1) return { errors: { id: `id Not Found: ${id}` } };

    let before = this.db[rowIndex];

    const [sanitized, errors] = this.sanitizer(
      updatedDiff(before, { ...before, ...updates }),
      true
    );
    if (Object.keys(errors).length) return { errors };

    const next = {
      ...before,
      ...sanitized,
      createdAt: before.createdAt, // ensure that this never changes
      updatedAt: Date.now()
    };
    this.db[rowIndex] = next;
    this.searchService.update(next);
    return { data: this.db[rowIndex] };
  };

  delete = async ({ id }) => {
    this.initSearchService();
    let rowIndex = this.db.findIndex(row => row.id === id);
    if (rowIndex === -1) return { errors: { id: `id Not Found: ${id}` } };
    this.db.splice(rowIndex, 1);
    this.searchService.remove({ id });
    return { error: false };
  };

  query = async (filters: { [fieldName: string]: any }) => {
    let rows = this.db.filter(row => {
      let match = true;
      for (let [column, value] of Object.entries(filters)) {
        if (row[column] !== value) match = false;
      }
      return match;
    });
    return { data: rows };
  };

  initSearchService = () => {
    if (!this.searchService) {
      const that = this;
      this.searchService = lunr(function() {
        this.ref('id');
        that.searchFields.map(sf => this.field(sf.name, { boost: sf.boost }));
        that.db.forEach(doc => this.add(doc), this);
      });
    }
  };

  search = async (search: string) => {
    this.initSearchService();
    const results = this.searchService
      .search(search)
      .filter(({ score }) => score > 1) // can limit scores this way. I try to tweak this per use case
      // .slice(0, 100) // Can limit results in this way, to reduce response size
      .map(({ ref }) => this.db.find(row => row.id === ref));
    return { data: results };
  };
}
