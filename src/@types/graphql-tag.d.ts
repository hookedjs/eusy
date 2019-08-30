export type gqlReturnType = {
  definitions: {
    operation: string; // e.g. 'mutation' | 'query',
    name: {
      value: string; // e.g. "CreateUser" | "UpdateUser"
    };
    variableDefinitions: {
      // like in mutations, you supply variables
      variable: {
        name: {
          value: string; // e.g. 'email' | 'nameGiven'
        };
      };
      type: {
        type: {
          name: {
            value: string; // e.g. "String!"
          };
        };
      };
    }[];
    selectionSet: {
      selections: {
        name: {
          value: string; // e.g. 'user' | 'users' | 'createUser' | 'updateUser'
        };
        arguments: {
          name: {
            value: string; // e.g. 'where' | 'data'
          };
          value: {
            fields: {
              name: {
                value: string; // e.g. 'id' | 'email', // these are where filters
              };
              value: {
                value: string; // e.g. 'bdombro@gmail.com' | 'email' if a variable like $email
              };
            }[];
          };
        }[];
        selectionSet: {
          // this is what's returned
          selections: {
            name: {
              value: string; // e.g. 'id' | 'email' | 'nameFirst' | 'nameLast'
            };
          }[];
        };
      }[];
    };
  };
};
