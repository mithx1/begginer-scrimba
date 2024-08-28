class ApiService {
  static async fetchMemes() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes;
  }
}

export default ApiService;
