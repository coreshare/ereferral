const BASE_URL = "https://ereferralapi.azurewebsites.net";

export const submitData = async (data) => {alert(data);
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

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/SPData/AddFile`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};