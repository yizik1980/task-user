import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DialogConfig } from "../modle/dialog";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private dialogState$ = new BehaviorSubject<{
    isOpen: boolean;
    config: DialogConfig;
  }>({
    isOpen: false,
    config: {},
  });

  constructor() {}

  open(config: DialogConfig): Observable<any> {
    this.dialogState$.next({
      isOpen: true,
      config: {
        canClose: true,
        closeOnBackdropClick: true,
        ...config,
      },
    });
    return this.getDialogState();
  }

  close(): void {
    this.dialogState$.next({
      isOpen: false,
      config: {},
    });
  }

  getDialogState(): Observable<any> {
    return this.dialogState$.asObservable();
  }

  isOpen(): boolean {
    return this.dialogState$.value.isOpen;
  }

  getConfig(): DialogConfig {
    return this.dialogState$.value.config;
  }

  confirm(title: string, message: string): Observable<boolean> {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "Cancel",
            type: "secondary",
            callback: () => {
              observer.next(false);
              observer.complete();
              this.close();
            },
          },
          {
            label: "Confirm",
            type: "primary",
            callback: () => {
              observer.next(true);
              observer.complete();
              this.close();
            },
          },
        ],
      });
    });
  }

  alert(title: string, message: string): Observable<void> {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "OK",
            type: "primary",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            },
          },
        ],
      });
    });
  }

  success(title: string, message: string): Observable<void> {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "OK",
            type: "primary",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            },
          },
        ],
      });
    });
  }
  error(title: string, message: string): Observable<void> {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "Close",
            type: "danger",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            },
          },
        ],
      });
    });
  }
}
