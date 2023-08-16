const BASE_URL = "https://ereferralapi.azurewebsites.net";
const Email_URL = "https://prod-122.westeurope.logic.azure.com:443/workflows/c06414d2d9f04468bbea2ea190967ab5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dm-lLnTWj6korfDk-n5G7zefHrKfPu4QUGtpSYi_vvI";

export const emailOTP = async (data) => {debugger;
  try {
    const response = await fetch(`${Email_URL}`, {
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

    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    console.log(error);
  }
};

export const generateOTP = async (email) => {debugger;
  try {
    const response = await fetch(`${BASE_URL}/OTP/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: email
    });

    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    console.log(error);
  }
};

export const validateOTP = async (otp) => {debugger;
  try {
    const response = await fetch(`${BASE_URL}/OTP/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: otp
    });

    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    console.log(error);
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

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.log(error);
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
