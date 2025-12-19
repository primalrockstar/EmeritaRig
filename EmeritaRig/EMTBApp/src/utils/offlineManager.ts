import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { storeEncryptedData, getEncryptedData } from './secureStorage';

type OfflineAction = {
  id: string;
  type: 'SUBMIT_QUIZ' | 'SAVE_PROGRESS' | 'SYNC_USER_DATA';
  payload: any;
  timestamp: number;
};

const QUEUE_STORAGE_KEY = 'OFFLINE_ACTION_QUEUE';

class OfflineManager {
  private isOnline: boolean = false;
  private queue: OfflineAction[] = [];
  private listeners: ((isOnline: boolean) => void)[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    // Load queue from secure storage
    const savedQueue = await getEncryptedData<OfflineAction[]>(QUEUE_STORAGE_KEY);
    if (savedQueue) {
      this.queue = savedQueue;
    }

    // Subscribe to network updates
    NetInfo.addEventListener((state: NetInfoState) => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected && state.isInternetReachable ? true : false;
      
      this.notifyListeners();

      if (wasOffline && this.isOnline) {
        this.processQueue();
      }
    });
  }

  public subscribe(listener: (isOnline: boolean) => void) {
    this.listeners.push(listener);
    listener(this.isOnline);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => l(this.isOnline));
  }

  public async queueAction(type: OfflineAction['type'], payload: any) {
    const action: OfflineAction = {
      id: Date.now().toString(),
      type,
      payload,
      timestamp: Date.now(),
    };

    this.queue.push(action);
    await this.persistQueue();

    if (this.isOnline) {
      this.processQueue();
    }
  }

  private async persistQueue() {
    await storeEncryptedData(QUEUE_STORAGE_KEY, this.queue);
  }

  private async processQueue() {
    if (this.queue.length === 0) return;

    console.log('Processing offline queue...', this.queue.length, 'items');

    const remainingActions: OfflineAction[] = [];

    for (const action of this.queue) {
      try {
        await this.executeAction(action);
      } catch (error) {
        console.error(`Failed to process action ${action.type}:`, error);
        // Keep in queue if it's a retryable error, otherwise discard or move to dead letter queue
        // For now, we'll keep it to retry later
        remainingActions.push(action);
      }
    }

    this.queue = remainingActions;
    await this.persistQueue();
  }

  private async executeAction(action: OfflineAction) {
    // This would connect to your API service
    console.log(`Executing ${action.type} with payload:`, action.payload);
    
    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  public getIsOnline(): boolean {
    return this.isOnline;
  }
}

export const offlineManager = new OfflineManager();
