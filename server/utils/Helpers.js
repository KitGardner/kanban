import { UnAuthorized } from "./Errors";
import { profilesService } from "../services/ProfilesService";

class Helpers {
  async validateCaller(userInfo) {
    let profile = await profilesService.getProfile(userInfo);
    if (!profile.subs.includes(userInfo.sub)) {
      throw new UnAuthorized("The calling user does not match the profile sent");
    }
    return profile;
  }
}

const helpers = new Helpers();
export default helpers;