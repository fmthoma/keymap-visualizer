# Refactoring Backlog

## Completed
- ✅ Extract IPC handlers to `ipc.ts`
  - Moved all IPC event handlers from main.ts
  - Set up proper imports and exports
  - Fixed quit functionality
- ✅ Extract Socket Server to `socket.ts`
  - Moved socket creation and management
  - Extracted message handling (restore/hide/toggle)
  - Added socket cleanup functionality
  - Moved socket file path constant
- ✅ Extract Development Setup to `development.ts`
  - Moved source map support configuration
  - Extracted debug mode setup
  - Centralized development-specific imports
  - Exported isDebug constant for reuse

## Pending

### High Priority
1. **Window State Management** → `window.ts`
   - Remove `getKeepInBackground`/`setKeepInBackground` functions
   - Consider a more elegant way to handle window state
   - Possibly use a state management pattern

### Low Priority
2. **Window State Management** → `window.ts`
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
- App lifecycle management stays in main.ts as it's the core responsibility of the main process
