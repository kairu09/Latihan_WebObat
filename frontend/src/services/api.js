const API_URL = "http://localhost:3000/api/obat";

export async function fetchObat() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching obat:", error);
    return [];
  }
}
