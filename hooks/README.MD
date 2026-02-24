Instructions for making API calls on Next.Js and TanStack Query

```
Component
   ↓
Hook (Query Layer)
   ↓
Service (API Client) - Calls overall API Provider
   ↓
Transformer / Adapter
   ↓
Type / Model
```

- Always through Hooks
- Create a Service that can be triggered via a hook
- Transformers live in the Service layer
- Types are to be explicitly defined in Types. Specify both Client (Dijkstra Web) and Server (Dataforge, Gitripper, etc) explicitly.
