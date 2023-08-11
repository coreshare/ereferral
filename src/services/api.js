const BASE_URL = "https://ereferralapi.azurewebsites.net";

export const submitData = async (data) => {debugger;
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

export const saveData = async (data) => {debugger;
  const transformedData = transformData(data);
  const formData = new FormData();
  formData.append("jsonObject", JSON.stringify(transformedData));

  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }
    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    throw new Error("Failed to submit data");
  }
};

export const uploadFileToLib = async (file, metadata) => {debugger;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));

  try {
    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
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

export const uploadFiles = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFiles`, {
      method: "POST",
      body: formData
    });

    //const responseData = await response.json();

    if (!response.ok) {
      alert(response.json())
      //throw new Error("Failed to upload file1");
    }
    
    return response;
  } catch (error) {
    alert(error)
    //throw new Error("Failed to upload file2");
  }
};

export const uploadFilesTest = async (files) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFilesTest`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    alert(responseData);
    return responseData;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

const transformData = (data) => {
  const transformed = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      // Convert null values to a special symbol, e.g., 'null'
      transformed[key] = value === null ? 'null' : value;
    }
  }

  return transformed;
};
