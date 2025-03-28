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

## Pending

### High Priority
1. **Development Setup** → `development.ts`
   - Source map support configuration
   - Debug mode setup
   - Development-specific imports

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
