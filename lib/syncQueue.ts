// Queue manager for offline-first local behavior
// It stores local drafts and pending mutations, syncing them to Supabase when online.

const SYNC_QUEUE_KEY = 'saltedhash_sync_queue';

export type SyncAction = {
  id: string;
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  payload: any;
  timestamp: number;
  status: 'pending' | 'failed' | 'completed';
};

export class SyncQueue {
  static getQueue(): SyncAction[] {
    if (typeof window === 'undefined') return [];
    const queueStr = localStorage.getItem(SYNC_QUEUE_KEY);
    if (!queueStr) return [];
    try {
      return JSON.parse(queueStr);
    } catch (e) {
      console.error('Failed to parse sync queue', e);
      return [];
    }
  }

  static setQueue(queue: SyncAction[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  }

  static addAction(action: Omit<SyncAction, 'id' | 'timestamp' | 'status'>) {
    const queue = this.getQueue();
    const newAction: SyncAction = {
      ...action,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      status: 'pending'
    };
    queue.push(newAction);
    this.setQueue(queue);

    // Attempt sync immediately if online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      this.sync();
    }
  }

  static async sync() {
    if (typeof window === 'undefined') return;

    const queue = this.getQueue();
    const pendingActions = queue.filter(a => a.status === 'pending' || a.status === 'failed');

    if (pendingActions.length === 0) return;

    try {
      const { supabase } = await import('./supabaseClient');

      for (const action of pendingActions) {
        let error = null;

        try {
          if (action.type === 'INSERT') {
            const { error: err } = await supabase.from(action.table).insert(action.payload);
            error = err;
          } else if (action.type === 'UPDATE') {
            const { error: err } = await supabase.from(action.table).update(action.payload).eq('id', action.payload.id);
            error = err;
          } else if (action.type === 'DELETE') {
            const { error: err } = await supabase.from(action.table).delete().eq('id', action.payload.id);
            error = err;
          }

          if (error) {
            console.error(`Sync action failed: ${action.id}`, error);
            action.status = 'failed';
          } else {
            action.status = 'completed';
          }
        } catch (e) {
          console.error(`Exception in sync action: ${action.id}`, e);
          action.status = 'failed';
        }
      }

      // Keep only pending or failed actions in the queue (or keep failed for a retry later)
      const remainingActions = queue.filter(a => a.status !== 'completed');
      this.setQueue(remainingActions);

    } catch (e) {
      console.error('Failed to import supabase client for sync', e);
    }
  }

  static setupOnlineListener() {
    if (typeof window === 'undefined') return;
    window.addEventListener('online', () => {
      console.log('App is online. Attempting to sync...');
      this.sync();
    });
  }
}
