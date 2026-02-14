# OpenCode Plugins

Custom plugins that extend OpenCode functionality with audio feedback and event handling.

## Plugins

### Peon (`peon.ts`)
Warcraft-themed audio feedback plugin that plays sound effects during coding sessions:
- Session events (created, idle, error)
- Command execution
- Permission responses
- File edits

Requires audio files in `assets/audio/` directory.

## Usage

Plugins are automatically loaded by OpenCode from this directory. Each plugin exports a function that receives the plugin API (`$`, `directory`) and returns event handlers.

## Configuration

- `.prettierrc.json` - Code formatting rules
- `tsconfig.json` - TypeScript compiler configuration
