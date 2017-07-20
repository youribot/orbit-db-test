# orbit-db-test

- [docstore](##docstorename-options) is a document database to which documents can be stored and indexed by a specified key. Useful for example building search indices or version controlling documents and data.

### docstore(name, options)

  Package:
  [orbit-db-docstore](https://github.com/shamb0t/orbit-db-docstore)

  ```javascript
  const db = orbitdb.docstore('orbit.users.shamb0t.profile')
  ```

  By default, documents are indexed by field '_id'. You can also specify the field to index by:

  ```javascript
  const db = orbitdb.docstore('orbit.users.shamb0t.profile', { indexBy: 'name' })
  ```

  - **put(doc)**
    ```javascript
    db.put({ _id: 'QmAwesomeIpfsHash', name: 'shamb0t', followers: 500 }).then((hash) => ...)
    ```

  - **get(key)**
    ```javascript
    const profile = db.get('shamb0t')
      .map((e) => e.payload.value)
    // [{ _id: 'shamb0t', name: 'shamb0t', followers: 500 }]
    ```

  - **query(mapper)**
    ```javascript
    const all = db.query((doc) => doc.followers >= 500)
    // [{ _id: 'shamb0t', name: 'shamb0t', followers: 500 }]
    ```

  - **del(key)**
    ```javascript
    db.del('shamb0t').then((removed) => ...)
    ```

  - **load()**

    Load the locally persisted database state to memory.

    ```javascript
    db.events.on('ready', () => {
      /* query */
    })
    db.load()
    ```

  - **events**

    ```javascript
    db.events.on('ready', () => /* local database loaded in memory */ )
    db.events.on('synced', () => /* query for updated results */ )
    ```
