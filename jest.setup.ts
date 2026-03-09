import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

(globalThis as unknown as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(globalThis as unknown as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;

(global as any).Request = globalThis.Request;
(global as any).Response = globalThis.Response;
(global as any).Headers = globalThis.Headers;
