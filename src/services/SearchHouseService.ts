import axios from "axios";

class SearchHouseService {
  retrieveAllHouses() {
    return axios.get("http://localhost:17698/houses");
  }
  retrieveAllHousesAmenities(amenityHref: any) {
    return axios.get(amenityHref);
  }
  search(a: string, g: string, min: string, max: string) {
    console.log(
      "http://localhost:17698/houses/advancedSearch?amenities=" +
        a +
        "&guestNumber=" +
        g +
        "&areaMin=" +
        min +
        "&areaMax=" +
        max
    );
    return axios.get(
      "http://localhost:17698/houses/advancedSearch?amenities=" +
        a +
        "&guestNumber=" +
        g +
        "&areaMin=" +
        min +
        "&areaMax=" +
        max
    );
  }
}

export default new SearchHouseService();
