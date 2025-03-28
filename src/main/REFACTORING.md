# Refactoring Backlog

## Completed
- ✅ Extract IPC handlers to `ipc.ts`
  - Moved all IPC event handlers from main.ts
  - Set up proper imports and exports
  - Fixed quit functionality

## Pending

### High Priority
1. **Socket Server Extraction** → `socket.ts`
   - Move socket creation and management
   - Extract message handling (restore/hide/toggle)
   - Handle socket cleanup
   - Move socket file path constant

### Medium Priority
2. **App Lifecycle Management** → `app-lifecycle.ts`
   - Single instance lock logic
   - Window-all-closed event handler
   - Second-instance handling
   - App activation logic

3. **Development Setup** → `development.ts`
   - Source map support configuration
   - Debug mode setup
   - Development-specific imports

### Low Priority
4. **Window State Management** → `window.ts`
   - Remove `getKeepInBackground`/`setKeepInBackground` functions
   - Consider a more elegant way to handle window state
   - Possibly use a state management pattern

### Code Quality
- Review and consolidate error handling patterns
- Standardize logging approach
- Consider adding TypeScript interfaces for IPC events

## Notes
- Keep modules small and focused
- Maintain clear separation of concerns
- Document any breaking changes 
