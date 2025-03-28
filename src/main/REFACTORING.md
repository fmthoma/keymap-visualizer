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
- ✅ Window State Management
  - Removed `getKeepInBackground`/`setKeepInBackground` functions
  - Implemented cleaner window close behavior with `isQuitting` flag
  - Fixed quit functionality to properly close window and exit app
- ✅ Resolve Cyclic Dependencies
  - Broke circular dependency between window.ts and tray.ts
  - Moved shared state to a separate module
  - Reviewed and resolved other potential circular dependencies
- ✅ Code Organization
  - Moved `installExtensions` from window.ts to development.ts
  - Extracted tray menu creation into separate function
  - Improved code organization and readability

## Pending

### High Priority
1. **Type Safety Improvements**
   - Add TypeScript interfaces for IPC events
   - Add proper typing for socket messages
   - Remove `any` type from electron-devtools-installer usage

### Medium Priority
2. **Constants Management**
   - Create a constants.ts file for all shared constants
   - Move SOCKET_FILE, window dimensions, etc. there
   - Consider environment-specific configuration

### Low Priority
3. **Testing Infrastructure**
   - Add unit tests for utility functions
   - Add integration tests for IPC handlers
   - Add mock implementations for electron APIs

### Code Quality
- Review and consolidate error handling patterns
- Standardize logging approach
- Consider adding TypeScript interfaces for IPC events

## Notes
- Keep modules small and focused
- Maintain clear separation of concerns
- Document any breaking changes
- App lifecycle management stays in main.ts as it's the core responsibility of the main process
