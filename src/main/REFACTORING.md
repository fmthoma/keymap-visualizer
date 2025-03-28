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

## Pending

### High Priority
1. **Resolve Cyclic Dependencies**
   - Break circular dependency between window.ts and tray.ts
   - Consider moving shared state to a separate module
   - Review other potential circular dependencies

2. **Error Handling Standardization**
   - Replace all `console.log` error handling with proper error handling
   - Add error types for different scenarios
   - Implement consistent error reporting mechanism

3. **Type Safety Improvements**
   - Add TypeScript interfaces for IPC events
   - Add proper typing for socket messages
   - Remove `any` type from electron-devtools-installer usage

### Medium Priority
4. **Code Organization**
   - Move `installExtensions` from window.ts to development.ts
   - Consider splitting tray.ts into menu.ts and tray.ts
   - Add proper JSDoc comments to all exported functions

5. **Constants Management**
   - Create a constants.ts file for all shared constants
   - Move SOCKET_FILE, window dimensions, etc. there
   - Consider environment-specific configuration

### Low Priority
6. **Testing Infrastructure**
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
