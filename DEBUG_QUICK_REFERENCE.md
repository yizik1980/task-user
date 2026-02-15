# VS Code Backend Debugging - Quick Reference

## 🚀 Start Debugging in 3 Steps

### Step 1: Open Debug View

Press **`Ctrl+Shift+D`** (Windows/Linux) or **`Cmd+Shift+D`** (Mac)

### Step 2: Select Configuration

Click dropdown at top → Select **"Debug Backend (ts-node)"**

### Step 3: Start Debugging

Press **`F5`** or click the green play button

✅ Server starts with debugging enabled!

---

## 🎯 Quick Actions

| Action             | Shortcut          | What It Does                       |
| ------------------ | ----------------- | ---------------------------------- |
| **Set Breakpoint** | Click line gutter | Pause execution at this line       |
| **Continue**       | `F5`              | Resume execution                   |
| **Step Over**      | `F10`             | Execute next line (skip functions) |
| **Step Into**      | `F11`             | Go inside function calls           |
| **Step Out**       | `Shift+F11`       | Exit current function              |
| **Restart**        | `Ctrl+Shift+F5`   | Restart debugging session          |
| **Stop**           | `Shift+F5`        | Stop debugger                      |

---

## 🔍 Debugging Endpoints

### Example: Debug the Login Route

1. Open `backend/src/routes/auth.ts`
2. Click line 15 (first line inside `/login` route)
3. Red dot appears = breakpoint set
4. Press `F5` to start debugging
5. Open http://localhost:4200 in browser
6. Click Login → Enter credentials → Submit
7. **Debugger pauses** at your breakpoint! ⏸️
8. Inspect `req.body` and `req.params` in Variables panel
9. Press `F10` to step through code

---

## 📊 View Variables

### While Paused at Breakpoint:

**Left Panel → Variables Tab:**

- `Local` - Current function's variables
- `Global` - Global scope variables
- `Closure` - Captured variables from outer scopes

**Expand** any object to see nested properties

---

## 💬 Debug Console

Use the console at bottom to evaluate expressions:

```javascript
// While paused in your code:
> user
{ id: 1, email: 'test@example.com', password: '...' }

> user.email
'test@example.com'

> typeof userData
'object'

> JSON.stringify(user, null, 2)
{ "id": 1, "email": "..." }
```

---

## 🔧 5 Debug Configurations

| Config               | When to Use                          |
| -------------------- | ------------------------------------ |
| **ts-node** ⭐       | Quick debugging, no compilation      |
| **ts-node-dev**      | Dev with auto-reload on file changes |
| **Attach**           | Debug already-running process        |
| **Compiled**         | Test production build locally        |
| **Attach (npm dev)** | Use your existing npm scripts        |

→ Start with **"Debug Backend (ts-node)"**

---

## 🎓 Complete Example: Debug User Registration

### Setup (One Time)

```
1. Ctrl+Shift+D
2. Select "Debug Backend (ts-node)"
3. F5 to start
```

### Debug Registration Flow

```
1. Open backend/src/routes/auth.ts
2. Click line 83 to set breakpoint
3. Go to http://localhost:4200
4. Click "Sign Up" button
5. Fill form and submit
6. Debugger PAUSES at breakpoint! ⏸️
7. Check Variables Panel:
   - req.body       (form data)
   - userData       (parsed data)
   - req.headers    (request headers)
8. Press F10 to step through validation
9. Press F11 to step into UserRepository
10. Inspect database operations
```

---

## 🐛 Common Issues & Fixes

### "Breakpoints not working"

- Make sure using **ts-node** config, not **Compiled**
- Restart debugger: `Shift+F5` then `F5`

### "Server won't start"

```bash
cd backend
npm install              # Install dependencies
npm run test-db          # Test database connection
```

### "Port 3000 already in use"

```bash
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# Or just restart VS Code
```

### "I can't see variable values"

- Make sure code is actually **paused** (yellow line visible)
- Breakpoint must be in executed code path
- Try adding `debugger;` statement then continue

---

## 🔗 Debug Database & API Calls

### Debug Database Query

```typescript
// backend/src/database/UserRepository.ts
async getUserByEmail(email: string) {
  console.log('Querying for:', email);  // ← Set breakpoint here
  const user = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM Users WHERE email = @email');
  return user.recordset[0];
}
```

### Debug API Response

```typescript
// backend/src/routes/auth.ts
router.post("/login", async (req: Request, res: Response) => {
  // ← Set breakpoint here to see request
  const user = await UserRepository.getUserByEmail(req.body.email);

  // ← Set breakpoint here to see response data
  res.json({
    success: true,
    data: { token: "..." },
  });
});
```

---

## ⏱️ Conditional Breakpoints

Break only when a specific condition is true:

```
1. Right-click on breakpoint (red dot)
2. Select "Edit Breakpoint..."
3. Enter condition: email === 'test@example.com'
4. Press Enter
5. Breakpoint now only triggers when condition is true
```

---

## 📺 Watch Expressions

Track values throughout execution:

```
1. Debug Console → Add Watch
2. Enter expression: userData.email
3. Value updates as you step through code
4. Great for tracking state changes
```

---

## 🎬 Logpoints (Debug Without Pausing)

Print debug info without stopping execution:

```
1. Right-click breakpoint
2. "Convert to Logpoint"
3. Enter: "User registered: {email}"
4. Prints to console instead of pausing
5. Useful for high-frequency code
```

---

## 📚 Debug Panels (Left Side)

| Panel             | Shows                              |
| ----------------- | ---------------------------------- |
| **Variables**     | Current scope variables            |
| **Watch**         | Tracked expressions (add your own) |
| **Call Stack**    | Function call chain                |
| **Breakpoints**   | All set breakpoints                |
| **Debug Console** | Output + evaluate expressions      |

---

## 🚀 Debug Full Flow (Auth → DB → Response)

```
Step 1: User submits login form from frontend
Step 2: Request hits /api/auth/login endpoint
        → Breakpoint 1: Inspect req.body

Step 3: Code queries database for user
        → Breakpoint 2: Inspect user object from DB

Step 4: Password comparison
        → Breakpoint 3: Check password validation result

Step 5: JWT token generation
        → Breakpoint 4: Inspect generated token

Step 6: Response sent to client
        → Breakpoint 5: Check final response object

Result: Frontend receives token & stores in localStorage
```

---

## ✨ Pro Tips

💡 **Tip 1**: Use `Ctrl+K Ctrl+I` to preview values while hovering

💡 **Tip 2**: Click "Restart" button to re-run with debugger attached

💡 **Tip 3**: Set breakpoint on catch block to debug errors

💡 **Tip 4**: Use Debug Console to test code: `> Math.max(5, 10)`

💡 **Tip 5**: Watch expressions survive across breakpoints as you step

---

## 🔗 More Info

📖 See full guide: [VSCODE_DEBUGGING.md](VSCODE_DEBUGGING.md)

🆘 Issues? Check DATABASE_SETUP.md or SQL_SERVER_TROUBLESHOOTING.md

---

## ⏲️ Keyboard Shortcuts Summary

```
Ctrl+Shift+D    Open Debug View
F5              Start / Continue
F10             Step Over
F11             Step Into
Shift+F11       Step Out
Shift+F5        Stop Debugger
Ctrl+Shift+F5   Restart
```

---

**Ready to debug? Press `Ctrl+Shift+D` and hit `F5`! 🎯**
