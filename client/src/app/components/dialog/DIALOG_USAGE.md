# Dialog Service & Component

A reusable, generic dialog/popup component for Angular applications that supports custom templates, multiple actions, and various dialog types.

## Features

- ✅ **Generic Dialog** - Works with any template/content
- ✅ **Multiple Dialog Types** - Alert, Confirm, Success, Error
- ✅ **Custom Actions** - Define multiple action buttons with callbacks
- ✅ **Customizable** - Width, height, title, message, styles
- ✅ **Close Options** - Close button, backdrop click, prevent close
- ✅ **Responsive** - Mobile-friendly design
- ✅ **Smooth Animations** - Fade in/slide up animations

## Files

- `dialog.service.ts` - Dialog service with state management
- `dialog.component.ts` - Dialog component
- `dialog.component.html` - Dialog template
- `dialog.component.css` - Dialog styling

## Usage

### 1. Basic Alert

```typescript
import { Component } from "@angular/core";
import { DialogService } from "./services/dialog.service";

@Component({
  selector: "app-example",
  template: `<button (click)="showAlert()">Show Alert</button>`,
})
export class ExampleComponent {
  constructor(private dialogService: DialogService) {}

  showAlert(): void {
    this.dialogService.alert("Success", "Operation completed successfully!");
  }
}
```

### 2. Confirmation Dialog

```typescript
showConfirm(): void {
  this.dialogService.confirm('Delete User', 'Are you sure you want to delete this user?')
    .subscribe(confirmed => {
      if (confirmed) {
        console.log('User deleted');
        this.deleteUser();
      }
    });
}
```

### 3. Error Dialog

```typescript
showError(): void {
  this.dialogService.error('Error', 'Failed to save changes. Please try again.');
}
```

### 4. Success Dialog

```typescript
showSuccess(): void {
  this.dialogService.success('Success', 'Changes saved successfully!');
}
```

### 5. Custom Dialog with Actions

```typescript
showCustomDialog(): void {
  this.dialogService.open({
    title: 'Welcome',
    message: 'This is a custom dialog with multiple actions',
    width: '400px',
    canClose: true,
    closeOnBackdropClick: true,
    actions: [
      {
        label: 'Cancel',
        type: 'secondary',
        callback: () => {
          console.log('Cancelled');
          this.dialogService.close();
        }
      },
      {
        label: 'Save',
        type: 'primary',
        callback: () => {
          console.log('Saved');
          this.dialogService.close();
        }
      },
      {
        label: 'Delete',
        type: 'danger',
        callback: () => {
          console.log('Deleted');
          this.dialogService.close();
        }
      }
    ]
  });
}
```

### 6. Dialog with Custom Data

```typescript
showDialogWithData(): void {
  this.dialogService.open({
    title: 'User Details',
    message: 'Confirm user information',
    data: {
      userId: 123,
      userName: 'John Doe',
      email: 'john@example.com'
    },
    actions: [
      {
        label: 'Confirm',
        type: 'primary',
        callback: (data) => {
          console.log('Data passed to callback:', data);
          this.dialogService.close();
        }
      }
    ]
  });
}
```

## Dialog Configuration Options

```typescript
interface DialogConfig {
  title?: string; // Dialog title
  message?: string; // Dialog message
  data?: any; // Custom data to pass to callbacks
  width?: string; // Dialog width (default: auto)
  height?: string; // Dialog height (default: auto)
  canClose?: boolean; // Show close button (default: true)
  closeOnBackdropClick?: boolean; // Close on backdrop click (default: true)
  actions?: DialogAction[]; // Action buttons
}

interface DialogAction {
  label: string; // Button label
  callback: (data?: any) => void; // Callback function
  type?: "primary" | "secondary" | "danger"; // Button style
  disabled?: boolean; // Disable button (default: false)
}
```

## Service Methods

### `open(config: DialogConfig): Observable<any>`

Open a custom dialog with configuration.

```typescript
this.dialogService.open({
  title: 'Dialog Title',
  message: 'Dialog message',
  actions: [...]
});
```

### `close(): void`

Close the currently open dialog.

```typescript
this.dialogService.close();
```

### `confirm(title: string, message: string): Observable<boolean>`

Show a confirmation dialog. Returns true if confirmed, false if cancelled.

```typescript
this.dialogService.confirm("Delete", "Are you sure?").subscribe((result) => {
  /* handle result */
});
```

### `alert(title: string, message: string): Observable<void>`

Show an alert dialog.

```typescript
this.dialogService.alert("Alert", "This is an alert message");
```

### `success(title: string, message: string): Observable<void>`

Show a success dialog.

```typescript
this.dialogService.success("Success", "Operation successful!");
```

### `error(title: string, message: string): Observable<void>`

Show an error dialog.

```typescript
this.dialogService.error("Error", "Something went wrong!");
```

### `getDialogState(): Observable<any>`

Get the current dialog state as an observable.

```typescript
this.dialogService.getDialogState().subscribe((state) => {
  /* handle state */
});
```

### `isOpen(): boolean`

Check if a dialog is currently open.

```typescript
if (this.dialogService.isOpen()) {
  // Dialog is open
}
```

### `getConfig(): DialogConfig`

Get the configuration of the currently open dialog.

```typescript
const config = this.dialogService.getConfig();
```

## Styling

The dialog uses a gradient purple theme with smooth animations:

- **Primary Button** - Purple gradient with hover effect
- **Secondary Button** - Gray with subtle hover
- **Danger Button** - Red with hover effect
- **Overlay** - Semi-transparent dark background
- **Animation** - 0.3s fade-in and slide-up effects

### Custom Styling

To customize the dialog appearance, modify `dialog.component.css`.

## Button Types

- **primary** - Blue gradient button for confirmations
- **secondary** - Gray button for cancellations
- **danger** - Red button for destructive actions

## Examples with Real Use Cases

### Delete User

```typescript
deleteUserConfirm(): void {
  this.dialogService.confirm(
    'Delete User',
    'Are you sure you want to delete this user? This action cannot be undone.'
  ).subscribe(confirmed => {
    if (confirmed) {
      this.userService.deleteUser(this.userId).subscribe(
        () => {
          this.dialogService.success('Success', 'User deleted successfully');
          this.loadUsers();
        },
        error => {
          this.dialogService.error('Error', 'Failed to delete user');
        }
      );
    }
  });
}
```

### Form Validation Error

```typescript
onFormSubmitError(): void {
  this.dialogService.error(
    'Validation Error',
    'Please fill in all required fields correctly'
  );
}
```

### Success Message

```typescript
onUserCreated(): void {
  this.dialogService.success(
    'User Created',
    'New user has been created successfully'
  );
}
```

## Notes

- The dialog service is provided in the `root` injector, making it available throughout the application
- Dialog component must be included in `app.component.html` for the dialogs to display
- Dialog state is managed globally via `DialogService`
- Multiple dialogs can be opened sequentially (one at a time)
- All callbacks receive the dialog config data as parameter (if provided)

---
