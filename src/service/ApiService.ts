class ApiService {
  static async fetchMemes() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes;
  }

  static async createMeme(params: any) {
    try {
      const response = await fetch(
        `https://api.imgflip.com/caption_image${this.objectToQueryParam(
          params
        )}`
      );
      const json = await response.json();
      return json.data.url;
    } catch (error) {
      console.error("Error creating meme:", error);
      throw error;
    }
  }

  private static objectToQueryParam(obj: any) {
    return (
      "?" +
      Object.keys(obj)
        .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
        .join("&")
    );
  }
}

export default ApiService;
