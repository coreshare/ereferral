const BASE_URL = "https://api.ereferralonline.com";//"https://ereferralapi.azurewebsites.net";
const Email_URL = "";

export const emailOTP = async (data) => {
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

export const submitData = async (data, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to submit data");
  }
};

export const saveData = async (data, accessToken) => {
  const transformedData = transformData(data);
  const formData = new FormData();
  formData.append("jsonObject", JSON.stringify(transformedData));

  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const responseBody = await response.json();
    return responseBody.toString();
  } catch (error) {
    console.log(error);
  }
};

export const generateOTP = async (emailval) => {
  const formData = new FormData();
  formData.append("email", emailval);
  try {
    const response = await fetch(`${BASE_URL}/OTP/generate`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }
    
    const responseBody = await response.text();
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (email, subject, emailText) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("subject", subject);
  formData.append("emailText", emailText);

  try {
    const response = await fetch(`${BASE_URL}/Email`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const validateOTP = async (otpval) => {
  const formData = new FormData();
  formData.append("otp", otpval);
  try {
    const response = await fetch(`${BASE_URL}/OTP/validate`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (response.ok) {
      const responseBody = await response.json();
      const accessToken = responseBody.accessToken;

      console.log("Access Token:", accessToken);
      return accessToken;
    }

    if (response.status === 400) {
      const errorResponse = await response.json();
      console.error("Bad Request:", errorResponse);
      return null;
    }

    throw new Error("Request failed with status: " + response.status);
    /*if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);*/
    //return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const validateReCaptcha = async (captcharesponse) => {
  const formData = new FormData();
  formData.append("recaptchaResponse", captcharesponse);
  try {
    const response = await fetch(`${BASE_URL}/Recaptcha/ValidateRecaptcha`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const validateDomain = async (domainval) => {
  const formData = new FormData();
  formData.append("domain", domainval);
  try {
    const response = await fetch(`${BASE_URL}/SPData/ValidateDomain`, {
      method: "POST",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const clearSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/ClearSession`, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const responseBody = await response.text();

    console.log("Response:", responseBody);
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const getNHSNumbers = async (accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const getMasterData = async (type_name, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/${type_name}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getReferralTypeStages = async (domainval, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/SPData/GetReferralTypeStages`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    
    if (!response.ok) {
      throw new Error("Request failed with status: " + response.status);
    }

    const data = await response.json();

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFileToLib = async (file, metadata, accessToken) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('metadata', JSON.stringify(metadata));

  try {
    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/SPData/UploadFile`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    return response;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const uploadFiles = async (files, accessToken) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFiles`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
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

export const uploadFilesTest = async (files, accessToken) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const response = await fetch(`${BASE_URL}/SPData/UploadFilesTest`, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
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
