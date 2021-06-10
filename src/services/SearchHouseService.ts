// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios from "@/request/http";

class SearchHouseService {
  retrieveAllHouses() {
    return axios.get("/houses");
  }
  retrieveAllHousesAmenities(amenityHref: any) {
    return axios.get(amenityHref);
  }
  search(a: string, g: string, min: string, max: string, title: string) {
    console.log(
      "/houses/advancedSearch?amenities=" +
        a +
        "&guestNumber=" +
        g +
        "&areaMin=" +
        min +
        "&areaMax=" +
        max +
        "&title=" +
        title
    );
    return axios.get(
      "/houses/advancedSearch?amenities=" +
        a +
        "&guestNumber=" +
        g +
        "&areaMin=" +
        min +
        "&areaMax=" +
        max +
        "&title=" +
        title
    );
  }
}

export default new SearchHouseService();
