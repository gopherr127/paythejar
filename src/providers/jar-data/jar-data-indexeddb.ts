import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jar, JarFilter } from '../../jar/jar';

@Injectable()
export class JarDataIdbProvider {

  //private static readonly FOURTYFIVE_MINUTES = 30 * 60 * 1000;
  //private static readonly ONE_HOUR = 60 * 60 * 1000;
  //private static readonly ONE_DAY = 24 * 60 * 60 * 1000;
  private static readonly SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  private static readonly THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  private db: IDBDatabase;

  constructor(public http: HttpClient) {
    
  }

  initProvider(): Promise<void> {
    let promise = this.initDb();

    if (!navigator.onLine) {
      return promise;
    }

    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      const lastUpdateTs = parseInt(lastUpdate);
      const now = Date.now();
      // The example from which this code was copied conditionally pulled
      // source data based on the time since last retrieval. 
      // We may want a different a strategy for this app.
      if (lastUpdateTs + JarDataIdbProvider.SEVEN_DAYS < now) {
        promise = promise.then(() => this.loadData(''));
      }
    }
    else {
      promise = promise.then(() => this.loadData(''));
    }

    // Every time we pull down new data, clean out the old.
    return promise.then(() => this.deleteOldRecords());
  }

  private initDb(): Promise<void> {
    if (this.db) {
      this.db.close();
    }

    return new Promise(resolve => {
      const openRequest = indexedDB.open("Jar", 1);

      openRequest.onupgradeneeded = event => {
        const target: any = event.target;
        const db = target.result;
        const store = db.createObjectStore('jars', {keyPath: 'id'});
        // Field-level indexes
        store.createIndex('name', 'name');
        store.createIndex('timeStored', 'timeStored');
      };

      openRequest.onsuccess = event => {
        this.db = (<any>event.target).result;

        this.db.onerror = event => {
          console.log(event);
        };

        resolve();
      }
    });
  }

  private loadData(dataUrl): Promise<void> {
    return new Promise(resolve => {
      this.http.get(dataUrl).subscribe(data => {
        //const tx = this.db.transaction('jars', 'readwrite');
        //const store = tx.objectStore('jars');

        // Store all records in IndexedDb for offline access
        /* for (let row of data.data) {
          if (row.id) {
            store.put({
              id: row.id,
              timeStored: Date.now(),
              name: row.name
            });
          }
        }

        tx.oncomplete = e => {
          localStorage.setItem('lastUpdate', Date.now().toString());
          resolve();
        } */
      })
    });
  }

  // Delete records that were stored locally 30 or more days ago
  private deleteOldRecords(): Promise<void> {
    const tx = this.db.transaction('jars', 'readwrite');
    const store = tx.objectStore('jars');
    const timeStoredIndex: any = store.index('timeStored');
    const thirtyDaysAgo = Date.now() - JarDataIdbProvider.THIRTY_DAYS;

    return new Promise(resolve => {
      timeStoredIndex.openCursor(IDBKeyRange.upperBound(thirtyDaysAgo)).onsuccess = event => {
        var cursor = event.target.result;
        if (cursor) {
          cursor.delete();
          cursor.continue();
        }
      };
      tx.oncomplete = e => resolve();
    });
  }

  filter(filter: JarFilter): Promise<Jar[]> {
    const tx = this.db.transaction('jars', 'readonly');
    const store = tx.objectStore('jars');
    const nameIndex: any = store.index('name');
    
    let promise = new Promise<Jar[]>(resolve => {
      if (filter.name) {
        nameIndex.getAll(IDBKeyRange.name.includes(filter.name))
          .onsuccess = e => resolve(e.target.result);
      }
      else {
        nameIndex.getAll()
          .onsuccess = e => resolve(e.target.result);
      }
    });

    // Sort results by name
    return promise.then(e => e.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }));
  }
}
