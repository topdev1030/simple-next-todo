import "@testing-library/jest-dom";

global.fetch = jest.fn((url: string | URL | Request, options?: RequestInit) => {
  if (
    options?.method === "PUT" ||
    options?.method === "DELETE" ||
    options?.method === "POST"
  ) {
    if (url === "/api/todos") {
      const data = {
        todoItems: [
          { id: 1, title: "Sample Task", isCompleted: false },
          // Add more items if necessary
        ],
      };

      // Create a valid Response object using Blob for JSON data
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const init: ResponseInit = {
        status: 200,
        statusText: "OK",
        headers: { "Content-Type": "application/json" },
      };

      return Promise.resolve(new Response(blob, init));
    }
  }

  return Promise.resolve({
    ok: true,
    status: 200,
    headers: {
      get: () => "application/json", // Mock implementation of `get`
    },
    json: () =>
      Promise.resolve({
        success: true,
      }), // Your desired JSON response
    text: () => Promise.resolve("Testing successfully"), // Mock implementation of `text`
    // Additional methods like `clone`, `blob`, etc., can be added if needed
  } as unknown as Response); // Type casting to Response
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
}));
