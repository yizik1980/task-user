# VS Code Backend Debugging Guide

## 🎯 Quick Start

1. **Open Debug View**: Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
2. **Select Config**: Click the dropdown at the top and choose a debug configuration
3. **Start Debugging**: Click the green play button or press `F5`
4. **Set Breakpoints**: Click on the left gutter next to any line number to add a breakpoint
5. **Debug Controls**: Use the toolbar to step through code

---

## 📋 Available Debug Configurations

### 1. **Debug Backend (ts-node)** ⭐ (Recommended for Development)

**What it does:**
- Directly runs your TypeScript code using ts-node
- No compilation step needed
- Fast startup
- Full sourcemap support (breakpoints work perfectly)

**How to use:**
```
1. Select "Debug Backend (ts-node)" from dropdown
2. Press F5
3. Server starts with debugging enabled
4. Set breakpoints in TypeScript files
```

**Best for:**
- Quick debugging during development
- When you want immediate feedback
- Testing database connections
- API endpoint testing

---

### 2. **Debug Backend (ts-node-dev)** 

**What it does:**
- Uses ts-node-dev with watch mode enabled
- Automatically restarts when files change
- Perfect for development workflow

**How to use:**
```
1. Select "Debug Backend (ts-node-dev)" from dropdown
2. Press F5
3. Server watches files and restarts on changes
4. Breakpoints still work after restart
```

**Best for:**
- Development with automatic reload
- Iterating on code quickly
- Testing changes without manual restarts

---

### 3. **Attach to Backend Process**

**What it does:**
- Attaches debugger to a running Node process on port 9229
- Use when backend is already running

**How to use:**
```bash
# Terminal 1: Start backend with debugging
cd backend
node --inspect-brk=9229 node_modules/.bin/ts-node src/index.ts

# Terminal 2: In VS Code
1. Select "Attach to Backend Process"
2. Press F5
3. Debugger attaches
```

**Best for:**
- Debugging production-like scenarios
- Attaching after startup issues

---

### 4. **Debug Backend (Compiled)**

**What it does:**
- First compiles TypeScript to JavaScript
- Then runs the compiled version
- Uses sourcemaps for debugging

**How to use:**
```
1. Select "Debug Backend (Compiled)"
2. Press F5
3. Compilation happens automatically
4. Compiled version runs with debugging
```

**Best for:**
- Testing production build locally
- Debugging compiled output
- Performance testing

---

### 5. **Debug & Attach Backend**

**What it does:**
- Runs npm script that starts the backend
- Auto-attaches debugger when process starts

**How to use:**
```
1. Select "Debug & Attach Backend"
2. Press F5
3. Backend starts via npm script
4. Debugger attaches automatically
```

**Best for:**
- Using your existing npm dev script
- Closest to how you normally run the app

---

## 🔧 Using Breakpoints

### Set a Breakpoint
1. Click on the line number's left gutter in any TypeScript file
2. A red dot appears = breakpoint set
3. Debugger will pause when that line executes

### Conditional Breakpoints
1. Right-click on a breakpoint (red dot)
2. Select "Edit Breakpoint..."
3. Enter a condition: `email === 'test@example.com'`
4. Breakpoint only pauses when condition is true

### Logpoints (Print without breaking)
1. Right-click on a breakpoint
2. Select "Convert to Logpoint"
3. Enter message: `"User email: " + email`
4. Value prints to console without pausing execution

---

## 🎮 Debug Controls

Once paused at a breakpoint:

```
F10   - Step Over (execute next line, don't dive into functions)
F11   - Step Into (go inside function calls)
Shift+F11 - Step Out (exit current function)
F5    - Continue (resume execution)
Ctrl+K Ctrl+I - Evaluate Expression (inspect variables)
```

---

## 📊 Useful Debug Windows

### Variables Panel
- Shows all variables in current scope
- Expand objects to see nested properties
- Right-click to "Add to Watch"

### Watch Panel
- Track expression values across execution
- Add with: `Ctrl+Shift+D` → "Watch" → add expression
- Useful for: `user.email`, `userData.id`, etc.

### Call Stack
- Shows function call chain
- Click to jump to any stack frame
- Useful for understanding code flow

### Debug Console (Bottom Panel)
```javascript
// Type JavaScript to evaluate in current context
> user.email
"test@example.com"

> userData.password
"hashed_password..."

> typeof userData
"object"
```

---

## 🐛 Debugging Common Issues

### Issue: "Cannot find module"
**Fix**: Make sure dependencies are installed
```bash
cd backend
npm install
```

### Issue: "Breakpoints aren't being hit"
**Check**:
1. Is the server actually executing that code path?
2. Is it the right configuration (ts-node vs compiled)?
3. Add a console.log to verify the code runs

### Issue: "Sourcemaps not working"
**Fix**: Make sure `sourceMaps: true` in launch.json (already configured)

### Issue: "Port 9229 already in use"
**Fix**: 
```bash
# Find process using port 9229
netstat -ano | findstr :9229

# Kill it
taskkill /PID <PID> /F
```

---

## 💡 Debugging Tips & Tricks

### 1. Debug Database Calls
```typescript
// In your route handler, set breakpoint here:
const user = await UserRepository.getUserByEmail(email);  // ← Breakpoint
// Step into to see what query is executed
```

### 2. Inspect Request/Response
```typescript
router.post('/login', async (req, res) => {
  console.log('Body:', req.body);  // ← Breakpoint here
  console.log('Headers:', req.headers);
  // ...
});
```

### 3. Debug Authentication
```typescript
// Set breakpoint in auth middleware
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;  // ← Breakpoint
  // Inspect token value in Debug Console
};
```

### 4. Check JWT Token Contents
```typescript
// In auth route, inspect decoded token
const decoded = JwtService.verifyToken(token);  // ← Breakpoint
// In Debug Console: > decoded.email
```

### 5. Watch Database Errors
```typescript
try {
  const user = await UserRepository.createUser(data);
} catch (error) {  // ← Breakpoint on catch
  console.error(error);  // Check error in Debug Console
}
```

---

## 🚀 Complete Debug Workflow

### Step 1: Start Debugging
```
1. Press Ctrl+Shift+D
2. Select "Debug Backend (ts-node)"
3. Press F5
4. Wait for server message: "✅ Backend server started successfully!"
```

### Step 2: Set Breakpoints
```
1. Open: backend/src/routes/auth.ts (or any file)
2. Click line 83 (register endpoint)
3. Red dot appears on left gutter
```

### Step 3: Trigger Code Path
```
Visit in browser: http://localhost:4200
Click "Sign Up"
Fill form and submit
Debugger pauses at your breakpoint
```

### Step 4: Inspect Variables
```
Variables Panel shows:
- req.body (form data)
- userData (parsed data)
- Any local variables

Right-click → "Copy Value" to clipboard
```

### Step 5: Step Through Code
```
Press F10: Step to next line
Press F11: Step into function
Ctrl+K Ctrl+I: Evaluate expression in Debug Console

Type in Debug Console:
> userData.email
> Object.keys(userData)
```

---

## 📝 Example: Debugging the Register Flow

**Goal**: Debug why user registration is failing

### Setup
```
1. Start debug: F5 → Select "Debug Backend (ts-node)" → F5
2. Open: backend/src/routes/auth.ts
3. Set breakpoint at line 83 (const userData = ...)
4. Set breakpoint at line 107 (const hashedPassword = ...)
```

### Execute
```
1. Open http://localhost:4200
2. Click "Sign Up"
3. Fill form: test@example.com / password / John / Doe
4. Click Submit
5. Debugger pauses at first breakpoint
```

### Debug
```
In Variables Panel:
- req.body → "submit" button click data
- userData → parsed as { email, password, ... }

Right-click userData → Log to Console

In Debug Console, type:
> userData
> userData.password
> userData.email
```

### Continue
```
Press F10 to step to next line
Watch validation checks
When it reaches database call, press F11 to enter UserRepository
```

---

## 🛠️ Advanced: Custom Debug Tasks

You can also run debug tasks from Command Palette:

```
Ctrl+Shift+P → "Tasks: Run Task"
Select from:
- "backend: compile typescript"
- "backend: start dev server"
- "backend: test connection"
- "backend: init database"
```

---

## 🔗 Integrate with Frontend Debugging

If you want to debug both frontend and backend together:

```
1. Ctrl+Shift+D
2. Look for "Debug Backend + Client" compound configuration
3. Press F5
4. Both start with debugging enabled
5. Frontend runs on http://localhost:4200
6. Backend runs with debugger on 9229
```

---

## ✅ Debugging Checklist

- [ ] `.vscode/launch.json` exists in project root
- [ ] Selected a debug configuration from dropdown
- [ ] Pressed F5 to start debugging
- [ ] Set a breakpoint in a TypeScript file
- [ ] Triggered code path (make API call, etc.)
- [ ] Debugger paused at breakpoint
- [ ] Inspected variables in Variables panel
- [ ] Used Debug Console to evaluate expressions
- [ ] Stepped through code with F10/F11

---

## 📚 More Resources

- **VS Code Node Debugging**: https://code.visualstudio.com/docs/nodejs/nodejs-debugging
- **ts-node Documentation**: https://typestrong.org/ts-node/
- **TypeScript Debugging**: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-aware-breakpoints-in-vs-code

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Breakpoints not working | Check if using correct config (ts-node, not compiled) |
| Server won't start | Run `npm run test-db` to verify database connection |
| Debugger not attaching | Restart VS Code and try again |
| Port already in use | Kill process: `taskkill /PID <PID> /F` |
| Sourcemaps not working | Make sure `sourceMaps: true` in launch.json |
| Can't evaluate expressions | Make sure code is paused at breakpoint first |

---

## 🎉 You're All Set!

You now have professional-grade debugging configured for your backend. Start with "Debug Backend (ts-node)" configuration and enjoy!
