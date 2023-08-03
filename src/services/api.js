const BASE_URL = "https://ereferralapi.azurewebsites.net"; // Replace with your API base URL

export const submitData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }
    return response;
  } catch (error) {
    throw new Error("Failed to submit data");
  }
};