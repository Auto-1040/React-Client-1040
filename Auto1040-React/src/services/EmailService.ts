const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendContactEmail = async (
    name: string,
    email: string,
    message: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          message,
        }),
      });
  
      return response.ok;
    } catch (error) {
      console.error("Failed to send contact email:", error);
      return false;
    }
  };
  