export function handleOpenAIStream(
  intent: string,
  text: string,
  onData: (data: string) => void,
  userPrompt?: string,
  onDone?: () => void
) {
  let endpoint = `/api/completions?intent=${encodeURIComponent(intent)}&text=${encodeURIComponent(text)}`;
  if (userPrompt) {
    endpoint += `&prompt=${encodeURIComponent(userPrompt)}`;
  }

  const eventSource = new EventSource(endpoint);

  eventSource.onopen = () => {
    console.info("[AI] Stream opened", { endpoint, intent, hasUserPrompt: Boolean(userPrompt), textChars: text.length });
  };

  eventSource.onmessage = (event) => {
    const data = event?.data ?? "";
    if (data === "__START__") {
      console.info("[AI] Stream started");
      return;
    }
    if (data.startsWith("__ERROR__:")) {
      console.error("[AI] Server error:", data.replace("__ERROR__:", ""));
      eventSource.close();
      return;
    }
    if (data === "[DONE]") {
      if (onDone) onDone();
      eventSource.close();
    } else {
      console.debug("[AI] chunk", data);
      onData(data);
    }
  };

  eventSource.onerror = () => {
    console.error("AI stream error from /api/completions", { endpoint });
    eventSource.close();
  };
}


