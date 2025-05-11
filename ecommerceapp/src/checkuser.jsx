import { fetchAuthSession } from "aws-amplify/auth";

async function checkUser(updateUser) {
  try {
    const userData = await fetchAuthSession();
    const { accessToken: { payload } } = userData.tokens;
    const groups = payload["cognito:groups"] || [];
    const isAdmin = groups.includes("Admin");
    updateUser({
      username: payload["cognito:username"],
      isAdmin,
    });
  } catch (error) {
    updateUser({ isAdmin: false });
  }
}

export default checkUser;
