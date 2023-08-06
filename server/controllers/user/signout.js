const signOut = (req, res) => {
  res.clearCookie("token").json({ msg: "Sign out Successfully" });
};
export default signOut;
