import { openDB } from 'idb';

const DB_NAME = "jate"

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // First, create a variable, and set it to asyncronously await the opening of the database. Replace the items in all caps
  
  // TODO: Change YOUR_OPEN_DB_VAR to whatever variable name you wanT. Note that you'll then need to change any other occcurences of YOUR_OPEN_DB_VAR to the same variable name.
  const DB = await openDB(DB_NAME, 1);

  // TODO: Now create a variable for the transaction; again, this will be referenced below.
  const TX = DB.transaction(DB_NAME, 'readwrite');

  // TODO: Now create a variable for the store
  const Store = TX.objectStore(DB_NAME);

  const request = Store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // You can duplicate the same lines of code from above, except that the transaction will be 'readonly'
  
  // TODO: Copy LINES 28, 31 and 34 above; the new line 31 code should be "readonly"

  const DB = await openDB(DB_NAME, 1);

  // TODO: Now create a variable for the transaction; again, this will be referenced below.
  const TX = DB.transaction(DB_NAME, 'readonly');

  // TODO: Now create a variable for the store
  const Store = TX.objectStore(DB_NAME);

  // Leave the rest as-is
  const request = Store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
