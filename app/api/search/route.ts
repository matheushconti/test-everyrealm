import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=200"
    );
    if (response?.data) {
      return Response.json(response.data);
    }
  } catch (e) {
    return Response.error();
  }
}
