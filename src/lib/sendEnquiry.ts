// Posts a form submission to the enquiry API. Returns an error message string
// on failure, or "" on success - so forms can show it inline in red.
export async function sendEnquiry(
  payload: Record<string, unknown>
): Promise<string> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      return data?.error || "Something went wrong. Please try again.";
    }
    return "";
  } catch {
    return "Network error. Please check your connection and try again.";
  }
}
