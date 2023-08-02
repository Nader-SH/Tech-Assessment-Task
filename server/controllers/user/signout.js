const signOut = (req, res) => {
  res.clearCookie("token").json({ msg: "logged out successfully" });
};
export default signOut;
